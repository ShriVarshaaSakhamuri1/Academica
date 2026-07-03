import React, { useState, useEffect } from 'react';

const JobsInternships = () => {
  const [listings, setListings] = useState([]);
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
      <ul>
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <li key={listing.job_id}>
              <h3>{listing.job_title} 
                { listing.job_type && 
                <span>({listing.job_type})</span>}
              </h3>
              <p>{listing.company_name} - {listing.location}</p>
            </li>
          ))
        ) : (
          <p>No listings available for this filter.</p>
        )}
      </ul>

      
    </div>
  );
};

export default JobsInternships;
