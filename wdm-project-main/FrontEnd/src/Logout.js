import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage (or you can specifically remove 'role')
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    // Optionally clear other user-related data
    // localStorage.clear(); // This clears all localStorage item

    // Redirect to the login page
    window.location.reload();
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
