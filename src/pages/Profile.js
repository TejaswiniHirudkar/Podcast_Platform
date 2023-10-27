import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import Loader from "../components/Common/Loader";
import Header from "../components/Common/Header";
import Button from "../components/Common/Button";
import FileInput from "../components/Common/Input/FileInput";
import { setProfilePicture, clearProfilePicture, selectProfilePicture } from "../slices/profilePictureSlice";
import { toast } from "react-toastify";
import UserPodcastGrid from "../components/Podcasts/UserPodcastGrid";
import "./Profile.css"

function Profile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const profileImage = useSelector(selectProfilePicture);
  // const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Profile Picture"); // Added state for upload button text
  const podcasts = useSelector((state) => state.podcasts.podcasts);

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
            setUploadButtonText("Change Profile Picture"); // Update the button text
            toast.success("Profile picture uploaded successfully!");
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
    setUploadButtonText("Upload Profile Picture"); // Change the button text
    toast.info("Profile picture changed. Please upload a new one.");
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="profile-container">
      <Header />
      {/* <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.uid}</h1> */}
        {profileImage && (
          <div>
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
            />
            <button onClick={handleProfileImageChange}>{uploadButtonText}</button>
          </div>
        )}
      {/* </h1> */}
      {!profileImage && !loading && (
        <div className="upload-button">
          <FileInput
            accept="image/*"
            id="profileImage"
            fileHandleFnc={handleProfileImageUpload}
            text={uploadButtonText} // Use the uploadButtonText state
          />
        </div>
      )}
      <h2>Your Podcasts:</h2>
      <UserPodcastGrid podcasts={podcasts} />
      <Button text="Logout" onClick={handleLogout} />
    </div>
  );
}

export default Profile;
