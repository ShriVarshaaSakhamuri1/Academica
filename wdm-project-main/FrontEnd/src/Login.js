import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import axios from 'axios'; // Import axios
import './Auth.css'; // Assuming you have a CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate for redirecting
  const userId = localStorage.getItem("user_id");
  console.log(userId)

  useEffect(() => {
    if (userId) {
      navigate('/student'); // Navigate to Student page if userId exists
    } else {
      navigate('/login'); // Navigate to Login page if userId is null
    }
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Make a POST request to the login API using axios
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        // Store the JWT token in localStorage (or sessionStorage)
        localStorage.setItem('token', data.token);

        // Optionally, store the role or user information if needed
        localStorage.setItem('role', data.role);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('email', data.email); 

        // Redirect based on user role
        if (data.token) {
          const decodedToken = (data.role); // Decode the token if you need to check role etc.

          if (decodedToken === 'academic') {
            console.log('Logging in as Admin:', { email });
            navigate('/admin'); // Redirect to admin dashboard
            alert('Login successful as Admin');
          } else if (decodedToken === 'student') {
            console.log('Logging in as Student:', { email });
            window.location.reload();
            navigate('/student'); // Redirect to student dashboard
            //alert('Login successful as Student');
          } else {
            setError('Invalid role');
            alert('Invalid role');
          }
        } else {
          setError('Authentication failed, no token received');
          alert('Authentication failed, no token received');
        }
      } else {
        setError(data.message || 'Invalid email or password');
        //alert(data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'An error occurred while logging in.');
      //alert(err.response?.data?.error || 'An error occurred while logging in.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
