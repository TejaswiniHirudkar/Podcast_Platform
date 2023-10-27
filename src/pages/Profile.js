import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loader from "../components/Common/Loader";
import Header from "../components/Common/Header";
import Button from "../components/Common/Button";
import FileInput from "../components/Common/Input/FileInput";
import {
  setProfilePicture,
  clearProfilePicture,
  selectProfilePicture,
} from "../slices/profilePictureSlice";
import { toast } from "react-toastify";
import UserPodcastGrid from "../components/Podcasts/UserPodcastGrid";
import "./Profile.css";
import PodcastCard from "../components/Podcasts/PodcastCard";

function Profile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const profileImage = useSelector(selectProfilePicture);
  const podcasts = useSelector((state) => state.podcasts.podcasts);

  const [loading, setLoading] = useState(false);

  // Determine the button text based on whether a profile picture exists
  const uploadButtonText = profileImage ? "Change Profile Picture" : "Upload Profile Picture";

  useEffect(() => {
    if (user) {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      getDownloadURL(storageRef)
        .then((url) => {
          dispatch(setProfilePicture(url));
        })
        .catch((error) => {
          console.error("Error loading profile picture from Firebase Storage:", error);
        });
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleProfileImageUpload = (file) => {
    setLoading(true);
    const storageRef = ref(storage, `profileImages/${user.uid}`);
    uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            dispatch(setProfilePicture(url));
            setLoading(false);
            // toast.success("Profile picture uploaded successfully!");
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error loading profile picture URL:", error);
          });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error uploading profile picture to Firebase Storage:", error);
      });
  };

  const handleProfileImageChange = () => {
    dispatch(clearProfilePicture());
    toast.info("Profile picture changed. Please upload a new one.");
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="profile-container">
      <Header />

      



      {profileImage && (
        <div className="profile-container">
          <img 
          src={profileImage} 
          alt="Profile" 
          className="profile-image" />
          {/* <PodcastCard
          key={user.uid}
          id={user.uid}
          title={user.name}
          displayImage={profileImage}
        /> */}
          {/* <Button onClick={handleProfileImageChange}>{uploadButtonText}</Button> */}
        </div>
      )}
      {!profileImage && !loading && (
        <div className="upload-button">
          <FileInput
            accept="image/*"
            id="profileImage"
            fileHandleFnc={handleProfileImageUpload}
            text={uploadButtonText}
          />
        </div>
      )}
      <h2>Your Podcasts</h2>
      <UserPodcastGrid podcasts={podcasts} />
      <div className="btncontainer"><Button text="Logout" onClick={handleLogout} className="logoutbtn"
       /></div>
    </div>
  );
}

export default Profile;
