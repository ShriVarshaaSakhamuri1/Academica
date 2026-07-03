import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    type: 'Job',
  });

  // Fetch job listings from the API on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getJobs'); // Replace with your API endpoint
        setListings(response.data.jobs); // Assuming the API response contains { jobs: [...] }
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListing({ ...newListing, [name]: value });
  };

  const handleNewListing = async (e) => {
    e.preventDefault();

    // Mapping form data to API expected format
    const jobData = {
      job_title: newListing.title,
      company_name: newListing.company,
      location: newListing.location,
      job_description: newListing.description,
      job_type: newListing.type,
      posted_by: '2', // Example: assuming it's always posted by Admin or dynamic data
      posted_date: new Date().toISOString(), // Get current timestamp
    };

    try {
      // Send the new job data to the Add Job API
      const response = await axios.post('http://localhost:3000/api/addJob', jobData); // Replace with your API endpoint
      const addedJob = response.data.job_id; // Assuming the API returns the newly created job's ID
      alert(response.data.message);
      window.location.reload();
      // Optionally, you can refetch the listings from the server to ensure data is up-to-date
      const jobsResponse = await axios.get('http://localhost:3000/api/getJobs');
      setListings(jobsResponse.data.jobs);  // Update job listings after posting

      // Reset form fields
      setNewListing({ title: '', company: '', location: '', description: '', type: 'Job' });
    } catch (error) {
      console.error('Error adding new job:', error);
    }
  };

  return (
    <div className='container'>
      <h3>Job Listings</h3>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            <strong>{listing.job_title}</strong> - {listing.company_name} ({listing.location}) [{listing.job_type}]
          </li>
        ))}
      </ul>

      <form onSubmit={handleNewListing} className="new-listing-form">
        <h3>Post a New Job or Internship</h3>
        <input
          type="text"
          name="title"
          placeholder="Job/Internship Title"
          value={newListing.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={newListing.company}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newListing.location}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={newListing.description}
          onChange={handleInputChange}
          required
        />
        <select name="type" value={newListing.type} onChange={handleInputChange}>
          <option value="Job">Job</option>
          <option value="Internship">Internship</option>
        </select>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostJob;
