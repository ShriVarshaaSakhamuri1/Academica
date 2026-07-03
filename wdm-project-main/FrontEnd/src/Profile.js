import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null); // To store fetched user data
  const [isEditing, setIsEditing] = useState(false); // To toggle editing mode
  const [editedUser, setEditedUser] = useState(null); // To store edited user data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors
  const navigate = useNavigate(); // React Router's navigation hook

  const checkSession = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login'); // Redirect to home page if no token
    }
  };

  // Fetch user details from API
  useEffect(() => {
    checkSession();
    const fetchUser = async () => {
      try {
        //const token = localStorage.getItem('token'); // Get the token from local storage
        const userId = localStorage.getItem('user_id');
        const response = await axios.get('http://localhost:3000/api/getUser', {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });
        setUser(response.data);
        setEditedUser(response.data); // Initialize edited data with fetched user
      } catch (err) {
        console.error(err);
        setError('Failed to load user data');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUser();
  }, [navigate]);
  // Listen for `localStorage` changes to detect logout
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'token' && !event.newValue) {
        // If token is removed from localStorage (logout)
        navigate('/login'); // Redirect to home page
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      await axios.put(
        'http://localhost:3000/api/updateUser',
        { ...editedUser },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(editedUser); // Update the state with the saved changes
      setIsEditing(false); // Exit editing mode
      alert('Updated Successfully');
    } catch (err) {
      console.error(err);
      setError('Failed to save changes');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={
            user?.profilePicture || 
            'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1728864000&semt=ais_hybrid-rr-similar'
          }
          alt="Profile"
          className="profile-picture"
        />
        <h1>{isEditing ? 'Edit Profile' : 'Profile'}</h1>
        <button onClick={handleEditToggle} className='btn btn-primary btn-sm'>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      <div className="profile-details">
        <div className="detail-item">
          <label>Name:</label>
          {isEditing ? (
            <>
              <input
                type="text"
                name="first_name"
                value={editedUser?.first_name || ''}
                placeholder="First Name"
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="last_name"
                value={editedUser?.last_name || ''}
                placeholder="Last Name"
                onChange={handleEditChange}
              />
            </>
          ) : (
            <span>{`${user?.first_name || ''} ${user?.last_name || ''}`}</span>
          )}
        </div>
        <div className="detail-item">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedUser?.email || ''}
              onChange={handleEditChange}
            />
          ) : (
            <span>{user?.email}</span>
          )}
        </div>
        <div className="detail-item">
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={editedUser?.phone || ''}
              onChange={handleEditChange}
            />
          ) : (
            <span>{user?.phone}</span>
          )}
        </div>
        <div className="detail-item">
          <label>Bio:</label>
          {isEditing ? (
            <textarea
              name="bio"
              value={editedUser?.bio || ''}
              onChange={handleEditChange}
            />
          ) : (
            <span>{user?.bio}</span>
          )}
        </div>
      </div>
      {isEditing && (
        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      )}
    </div>
  );
};

export default Profile;
