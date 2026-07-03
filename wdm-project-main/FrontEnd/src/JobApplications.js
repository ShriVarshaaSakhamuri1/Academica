import React, { useState, useEffect } from 'react';

const JobApplications = () => {
  const [listings, setListings] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // New state to track applied jobs
  const [newListing, setNewListing] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-Time' // Default type is 'Full-Time'
  });
  const [filter, setFilter] = useState('All'); // Filter state to track 'All', 'Full-Time', or 'Internship'

  // Fetch job listings from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getJobs');
        const data = await response.json();
        if (data.jobs) {
          setListings(data.jobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []); // Empty array ensures this runs only once when the component mounts

  // Fetch applied jobs from the API (Assuming you have an endpoint for this)
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getAppliedJobs');
        const data = await response.json();
        if (data.jobs) {
          setAppliedJobs(data.jobs);
        }
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, []); // Empty array ensures this runs only once when the component mounts

  // Filter the listings based on the current filter
  const filteredListings = listings.filter((listing) => {
    if (filter === 'All') {
      return true; // Show all listings
    }
    return listing.job_type && listing.job_type.toLowerCase() === filter.toLowerCase(); // Filter based on job_type value
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListing({ ...newListing, [name]: value });
  };

  const handleNewListing = (e) => {
    e.preventDefault();
    const newJob = {
      id: listings.length + 1,
      ...newListing
    };
    setListings([...listings, newJob]);
    setNewListing({ title: '', company: '', location: '', type: 'Full-Time' }); // Reset to Full-Time after submission
  };

  const handleApplyJob = (jobId) => {
    // Assuming you have an apply API endpoint
    const applyJob = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/applyJob/${jobId}`, {
          method: 'POST'
        });
        if (response.ok) {
          setAppliedJobs([...appliedJobs, listings.find((job) => job.job_id === jobId)]);
        }
      } catch (error) {
        console.error('Error applying for job:', error);
      }
    };
    applyJob();
  };

  return (
    <div className="jobs-internships">
      <h2>Job and Internship Postings</h2>
      <p>Explore job and internship opportunities or post a new one.</p>

      {/* Filter Options */}
      <div className="filter-options">
        <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>
          All
        </button>
        <button onClick={() => setFilter('Full-Time')} className={filter === 'Full-Time' ? 'active' : ''}>
          Full-Time
        </button>
        <button onClick={() => setFilter('Internship')} className={filter === 'Internship' ? 'active' : ''}>
          Internship
        </button>
      </div>

      {/* Listings */}
      <h3>Job Listings</h3>
      <ul>
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <li key={listing.job_id}>
              <h3>{listing.job_title} <span>({listing.job_type})</span></h3>
              <p>{listing.company_name} - {listing.location}</p>
              {/* <button onClick={() => handleApplyJob(listing.job_id)} className="apply-btn">Apply</button> */}
            </li>
          ))
        ) : (
          <p>No listings available for this filter.</p>
        )}
      </ul>

      {/* Applied Jobs */}
      <h3>Applied Jobs</h3>
      <ul>
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <li key={job.job_id}>
              <h3>{job.job_title} <span>({job.job_type})</span></h3>
              <p>{job.company_name} - {job.location}</p>
              <button className="applied-btn" disabled>Already Applied</button>
            </li>
          ))
        ) : (
          <p>No applied jobs yet.</p>
        )}
      </ul>
    </div>
  );
};

export default JobApplications;
