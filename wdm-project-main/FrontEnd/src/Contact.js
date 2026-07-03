import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !subject || !message) {
      setError('Please fill in all fields');
      setSuccess('');
      return;
    }

    // Prepare payload for API request
    const payload = {
      emailId: email,
      name,
      mobileNumber: '0000000000', // Default value
      message,
      subject,
    };

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:3000/api/contactUs', payload);

      if (response.status === 200) {
        setSuccess('Message sent successfully!');
        setError('');
        // Optionally navigate to a success page or reset the form
        setTimeout(() => navigate('/'), 2000); // Redirect to homepage after 2 seconds
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <div className="d-flex">
        <div className="contact-info">
          <p>Email: conference@example.com</p>
          <p>Phone: +1-234-567-890</p>
          <p>Address: 123 Conference Ave, City, State, ZIP</p>
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="buttonStyleAT">Send Message</button>
        </form>
      </div>
      <div className="map-container">
        <h3>Our Location</h3>
        <iframe
          title="conference-location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509339!2d144.95373531590425!3d-37.81720997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f8f1fd2b%3A0x506f23a3e43c7f0!2s123+Conference+Ave%2C+Melbourne+VIC%2C+Australia!5e0!3m2!1sen!2sus!4v1616380824209!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
