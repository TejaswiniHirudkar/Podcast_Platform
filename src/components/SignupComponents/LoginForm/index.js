import React, { useState } from "react";
import InputComponent from "../../Common/Input";
import Button from "../../Common/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser, clearUser } from "../../../slices/userSlice"; // Import your actions
import { selectUser } from "../../../slices/userSlice"; // Import your selectors
import { toast } from "react-toastify";
import ResetPassword from "../ResetPassword";
import { clearPodcasts } from "../../../slices/podcastSlice";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  const handleLogin = async () => {
    setLoading(true);
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (currentUser) {
          // Clear the previous user's data when a new user logs in
          dispatch(clearUser());
          dispatch(clearPodcasts()); // Clear podcast data
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
          })
        );

        toast.success("Login Successful!");
        setLoading(false);
        navigate("/profile");
      } catch (error) {
        console.error("Error signing in:", error);
        setLoading(false);
        toast.error(error.message);
      }
    } else {
      toast.error("Make sure email and password are not empty");
      setLoading(false);
    }
  }

  return (
    <>
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="text"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />

      <Link to="/reset-password" style={{ color: "white" }}>Forgot your password?</Link>

      <Button
        text={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
    </>
  );
}

export default LoginForm;
