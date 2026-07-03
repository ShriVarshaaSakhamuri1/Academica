// AccountSettings.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Settings.css";

const AccountSettings = () => {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [password, setPassword] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState(''); // Define setError
  const [success, setSuccess] = useState(''); // Define setSuccess

  // Handle input changes for forms
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Submit profile updates
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate that the new password and confirm password match
    if (password.newPassword !== password.confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      const userId = localStorage.getItem("user_id");
      const response = await axios.put('http://localhost:3000/api/updatePassword', {
        id: userId, // Replace with actual user ID (possibly from context or props)
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
      });

      if (response.status === 200) {
        setSuccess('Password updated successfully');
        setPassword({ oldPassword: '', newPassword: '', confirmPassword: '' }); // Clear password inputs
        //Navigate("/logout");
      }
    } catch (err) {
      console.error('Error updating password:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Failed to update password');
      } else {
        setError('Failed to update password');
      }
    }
  };

  return (
    <div className="account-settings container">
      <h2 className='title-at'>Account Settings</h2>
      <Link to="/notification-preferences" className="btn btn-primary">Notification Preferences</Link>

      {/* Password Change */}
      <form onSubmit={handlePasswordSubmit}>
        <h3>Change Password</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <label>Old Password:</label>
        <input type="password" name="oldPassword" value={password.oldPassword} onChange={handlePasswordChange} />
        <label>New Password:</label>
        <input type="password" name="newPassword" value={password.newPassword} onChange={handlePasswordChange} />
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={password.confirmPassword} onChange={handlePasswordChange} />
        <button type="submit" className='buttonStyleAT'>Change Password</button>
      </form>

      {/* Account Management */}
      {/* <div className="account-management">
        <h3>Account Management</h3>
        <button className="delete-account">Delete Account</button>
        <button className="two-factor-auth">Manage Two-Factor Authentication</button>
      </div> */}
    </div>
  );
};

export default AccountSettings;
