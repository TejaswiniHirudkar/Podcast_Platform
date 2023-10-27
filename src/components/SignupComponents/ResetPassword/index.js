import React, { useState } from 'react';
import InputComponent from '../../Common/Input';
import Button from '../../Common/Button';
import { auth } from '../../../firebase';
import { toast } from 'react-toastify';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);

    try {
      await auth.sendPasswordResetEmail(email);
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error('Error sending password reset email. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="email"
        required={true}
      />
      <Button
        text={loading ? 'Loading...' : 'Reset Password'}
        onClick={handleResetPassword}
        disabled={loading}
      />
    </div>
  );
}

export default ResetPassword;
