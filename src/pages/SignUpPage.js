import React, { useState } from 'react';
import Header from '../components/Common/Header';
import SignupForm from '../components/SignupComponents';
import LoginForm from '../components/SignupComponents/LoginForm';
// import ForgetPassword from "../components/Common/ForgetPassword"; // Import the ResetPassword component
import { useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import ResetPassword from '../components/SignupComponents/ResetPassword';

function SignUpPage() {
  const [flag, setFlag] = useState(false);
  const [loginMode, setLoginMode] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLoginLinkClick = () => {
    setFlag(true); // Show the login form
    setLoginMode(true); // Set login mode
  };

  const handleSignupLinkClick = () => {
    setFlag(false); // Show the signup form
    setLoginMode(false); // Set signup mode
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>SignUp</h1> : <h1>Login</h1>}
        {!flag ? <SignupForm /> : (loginMode ? <LoginForm /> : <ResetPassword/>)} {/* Conditional rendering based on loginMode */}
        {!flag ? (
          <p style={{ cursor: "pointer" }}>
            <span onClick={handleLoginLinkClick}>Already have an Account? Click here to Login.</span>
          </p>
        ) : (
          <p style={{ cursor: "pointer" }}>
            <span onClick={handleSignupLinkClick}>Don't have an account? Click here to signup.</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
