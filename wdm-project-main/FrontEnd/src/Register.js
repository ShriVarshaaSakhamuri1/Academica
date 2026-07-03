import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css"; // Assuming you have a CSS file for styling

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Function to calculate password strength
  const evaluatePasswordStrength = (password) => {
    let strength = "";
    const regexes = [
      /[a-z]/, // Lowercase letters
      /[A-Z]/, // Uppercase letters
      /[0-9]/, // Numbers
      /[^a-zA-Z0-9]/, // Special characters
    ];

    const matches = regexes.reduce(
      (count, regex) => (regex.test(password) ? count + 1 : count),
      0
    );
    if (password.length >= 8 && matches === 4) {
      strength = "Strong";
    } else if (password.length >= 6 && matches >= 2) {
      strength = "Moderate";
    } else {
      strength = "Weak";
    }

    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = evaluatePasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (passwordStrength === "Weak") {
      setError("Password strength is too weak");
      return;
    }

    try {
      // Make a POST request to the register API
      const response = await axios.post("http://localhost:3000/api/register", {
        email,
        password,
        // phone,
        // gender,
        // bio,
      });

      if (response.status === 201) {
        setSuccess("User registered successfully");
        setError("");
        // Redirect to login page
        setTimeout(() => navigate("/login"), 2000); // Wait for 2 seconds before redirect
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.error || "An error occurred during registration"
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
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
            onChange={handlePasswordChange} // Update to track password strength
            required
          />
          {password && (
            <p
              className={`password-strength ${passwordStrength.toLowerCase()}`}
            >
              Strength: {passwordStrength}
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
