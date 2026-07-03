import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed
import "./Forumpage.css"

const ForumPage = () => {
  const location = useLocation();
  const { groupId, userId } = location.state || {}; // Get groupId and userId from navigation state
  const [messages, setMessages] = useState([]); // State for storing messages
  const [title, setTitle] = useState(''); // Title input
  const [content, setContent] = useState(''); // Content input
  const [error, setError] = useState(''); // Error message
  const [success, setSuccess] = useState(''); // Success message

  // Fetch messages when the component loads
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getChat', {
            params: { group_id: groupId }, // Pass group_id as query parameter
        });
        setMessages(response.data); // Set messages from response
        console.log(response);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages');
      }
    };

    fetchMessages();
  }, [groupId]);

  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3000/api/messages', {
        user_id: userId,
        group_id: groupId,
        title,
        content,
      });

      if (response.status === 201) {
        setSuccess('Message sent successfully');
        setTitle(''); // Clear inputs
        setContent('');
        // Reload messages after successful submission
        setMessages((prevMessages) => [
          ...prevMessages,
          { user_id: userId, group_id: groupId, title, content },
        ]);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  };

  return (
    <div>
      <h2>Forum Page</h2>
      <p><strong>Group ID:</strong> {groupId}</p>

      {/* Display error or success messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Chat Messages */}
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            <h4>{message.title}</h4>
            <p>{message.content}</p>
            <small>Posted by User: {message.first_name} {message.last_name}</small>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="message-form">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ForumPage;
