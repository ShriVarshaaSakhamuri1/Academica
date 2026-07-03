import React, { useState } from 'react';

const mentors = [
  { id: 1, name: 'John Doe', expertise: 'Web Development' },
  { id: 2, name: 'Jane Smith', expertise: 'Data Science' },
  // Add more mentors
];

const MentorshipApplication = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mentorId: '',
    goals: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
    console.log(formData);
  };

  return (
    <div className="mentorship-application container">
      <h2>Mentorship Program Application</h2>
      <form onSubmit={handleSubmit}>
        {/* Student Information */}
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        {/* Mentor Selection */}
        <label>Choose a Mentor:</label>
        <select name="mentorId" value={formData.mentorId} onChange={handleChange} required className='form-control'>
          <option value="">Select a mentor</option>
          {mentors.map((mentor) => (
            <option key={mentor.id} value={mentor.id}>{mentor.name} - {mentor.expertise}</option>
          ))}
        </select>

        {/* Goals */}
        <label>Your Goals:</label>
        <textarea name="goals" value={formData.goals} onChange={handleChange} required placeholder="What do you hope to achieve through this mentorship?" />

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default MentorshipApplication;
