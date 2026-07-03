import React, { useState, useEffect } from 'react';
const addJobsInternships = () => {
  return (
    
    <div className="jobs-internships">
      <h2>Job and Internship Postings</h2>
      <p>Explore job and internship opportunities or post a new one.</p>

<div className="post-new-listing">
        <h3>Post a New Job/Internship</h3>
        <form onSubmit={handleNewListing}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newListing.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={newListing.company}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={newListing.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Type:</label>
            <select
              name="type"
              value={newListing.type}
              onChange={handleInputChange}
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <button type="submit">Post Listing</button>
        </form>
      </div>
      </div>
  )

    };
    export default addJobsInternships;
