import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Student.css";
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button components

const Student = () => {

  const [jobs, setJobs] = useState([]); // State to hold job listings
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track any error
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedJob, setSelectedJob] = useState(null); // State to store selected job for applying
  const [coverLetter, setCoverLetter] = useState(''); // State for cover letter
  const [experience, setExperience] = useState(''); // State for experience
  const [skills, setSkills] = useState(''); // State for skills
  const [resume, setResume] = useState(null); // State for resume file
  const [appliedJobs, setAppliedJobs] = useState([]); // State to store applied jobs
  const [loadingApplied, setLoadingApplied] = useState(true); // Loading state for applied jobs
  const [errorApplied, setErrorApplied] = useState(null); // Error state for applied jobs
  const navigate = useNavigate(); // React Router's navigation hook
  
  useEffect(() => {
    // Fetch jobs from API when the component mounts
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getJobs');
        setJobs(response.data.jobs); // Set jobs to the state
        setLoading(false); // Stop loading once the data is fetched
      } catch (err) {
        setError('Failed to load jobs'); // Handle error
        setLoading(false); // Stop loading in case of an error
      }
    };

    fetchJobs();
  }, [navigate]); // Empty dependency array ensures this runs only once when the component mounts

  // Fetch applied jobs from the API
const fetchAppliedJobs = async () => {
  try {
    const user_id = localStorage.getItem('user_id'); // Get user ID from local storage
    const token = localStorage.getItem('token'); // Get authorization token from local storage

    const response = await axios.get(`http://localhost:3000/api/getAppliedJobs?user_id=${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    });

    setAppliedJobs(response.data.appliedJobs); // Set applied jobs to state
    setLoadingApplied(false); // Stop loading once data is fetched
  } catch (err) {
    setErrorApplied('Failed to load applied jobs'); // Handle error
    setLoadingApplied(false); // Stop loading in case of an error
  }
};

useEffect(() => {
  fetchAppliedJobs();
}, [navigate]); // Runs only once when the component mounts


  // Handle opening the modal with the selected job
  const handleApplyJob = (job) => {
    setSelectedJob(job); // Store the selected job
    setShowModal(true); // Show the modal
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedJob(null); // Reset selected job
    setCoverLetter('');
    setExperience('');
    setSkills('');
    setResume(null); // Reset all form fields
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    var user_id  = localStorage.getItem('user_id');
    // Create a FormData object to send the form data including the file
    const formData = new FormData();
    formData.append('coverLetter', document.getElementById('coverLetter').value);
    formData.append('experience', document.getElementById('experience').value);
    formData.append('skills', document.getElementById('skills').value);
    formData.append('resume', document.getElementById('resume').files[0]);
    formData.append('jobId', selectedJob.job_id); // Pass the job ID
    formData.append('user_id', user_id); // Pass the job ID
  
    try {
      // Send POST request to the API route
      const response = await axios.post('http://localhost:3000/api/applyJob', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      alert(response.data.message);
      // Handle success (show success message, close modal, etc.)
      handleCloseModal();
    } catch (error) {
      console.error('Error applying for job:', error);
      // Handle error (show error message)
    }
  };
  

  if (loading) {
    return <div>Loading jobs...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there was an issue
  }

  return (
    <div className="student-dashboard container">
      <h1 className='welcome-at'>Welcome to the Student Dashboard</h1>

      {/* Navigation Links */}
      <div className="navigation-at">
        {/* <NavLink to="/settings" activeClassName="active-link">Account Settings</NavLink> */}

        <button className="btn btn-primary btn-sm"><a href='/settings' className='text-white'>Account Settings</a></button>
        <button className="btn btn-primary btn-sm"><a href='/careerdevelopment' className='text-white'>Career Development Resources</a></button>
        {/*<button className="btn btn-primary btn-sm"><a href='/forums' className='text-white'>Forums</a></button>*/}
        <button className="btn btn-primary btn-sm"><a href='/mentorshipapplication' className='text-white'>Apply Mentorship</a></button>
        <button className="btn btn-primary btn-sm"><a href='/mentorship' className='text-white'>Mentorship Programs</a></button>
        {/*<button className="btn btn-primary btn-sm"><a href='/groups' className='text-white'>Groups</a></button>*/}
        <button className="btn btn-primary btn-sm"><a href='/notification-preferences' className='text-white mt-5'>Notification Preferences</a></button>
        
      </div>

      {/* Jobs Section */}
      <div className="jobs">
        <h3>Available Job Listings</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Posted Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              // Check if the current job has been applied already
              const isApplied = appliedJobs.some(appliedJob => appliedJob.job_id === job.job_id);

              return (
                <tr key={job.job_id}>
                  <td>{job.job_title}</td>
                  <td>{job.company_name}</td>
                  <td>{job.location}</td>
                  <td>{new Date(job.posted_date).toLocaleDateString()}</td> {/* Format posted date */}
                  <td>
                    <button
                      className={`btn btn-sm ${isApplied ? 'btn-secondary' : 'btn-primary'}`} // Grays out the button if applied
                      onClick={() => isApplied ? null : handleApplyJob(job)} // Disable the click if already applied
                      disabled={isApplied} // Disable button if applied
                    >
                      {isApplied ? 'Applied' : 'Apply'} {/* Show 'Applied' if the job has been applied to */}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Apply Job Modal */}
      {selectedJob && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Apply for Job: {selectedJob.job_title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  <form onSubmit={handleSubmitApplication}>
    <div className="form-group">
      <label htmlFor="coverLetter">Cover Letter</label>
      <textarea
        id="coverLetter"
        className="form-control"
        rows="4"
        placeholder="Write your cover letter here..."
      />
    </div>

    <div className="form-group mt-3">
      <label htmlFor="experience">Experience</label>
      <textarea
        id="experience"
        className="form-control"
        rows="4"
        placeholder="Describe your experience..."
      />
    </div>

    <div className="form-group mt-3">
      <label htmlFor="skills">Skills</label>
      <textarea
        id="skills"
        className="form-control"
        rows="4"
        placeholder="List your skills..."
      />
    </div>

    <div className="form-group mt-3">
      <label htmlFor="resume">Upload Resume</label>
      <input type="file" className="form-control" id="resume" />
    </div>

    <Button variant="primary" type="submit" className="mt-3">Submit Application</Button>
  </form>
</Modal.Body>

        </Modal>
      )}
{/* Applied Jobs Section */}
<div className="applied-jobs mt-5">
  <h3>Your Applied Jobs</h3>
  {loadingApplied ? (
    <div>Loading applied jobs...</div> // Show loading message
  ) : errorApplied ? (
    <div>{errorApplied}</div> // Show error message if any
  ) : appliedJobs.length > 0 ? (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Company</th>
          <th>Application Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {appliedJobs.map((job) => (
          <tr key={job.job_id}>
            <td>{job.job_title}</td>
            <td>{job.company_name}</td>
            <td>{new Date(job.created_at).toLocaleDateString()}</td> {/* Format application date */}
            <td>Pending</td> {/* Status like Pending, Approved, etc. */}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div>No applied jobs found</div> // Show message if no jobs are found
  )}
</div>

    </div>
  );
};

export default Student;
