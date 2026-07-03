import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "./Callpapers.css";

const CallForPapers = () => {
  const [submissions, setSubmissions] = useState([]); // State for user submissions
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [title, setTitle] = useState(""); // State for paper title
  const [abstract, setAbstract] = useState(""); // State for paper abstract
  const [file, setFile] = useState(null); // State for file upload
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch submissions when the page loads
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getSubmissions", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSubmissions(response.data.submissions); // Load submissions into state
        setLoading(false);
      } catch (err) {
        //setError("Failed to fetch submissions");
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  // Handle file upload change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("abstract", abstract);
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/api/submitPaper", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert(response.data.message);
      setSubmissions((prev) => [...prev, response.data.submission]); // Add new submission to state
      setShowModal(false); // Close modal
      setTitle("");
      setAbstract("");
      setFile(null); // Reset form
    } catch (err) {
      alert("Error submitting paper");
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setTitle("");
    setAbstract("");
    setFile(null);
  };

  return (
    <div className="container">
      <div className="callpapers"> 
        <h1>Call for Papers</h1>
        <p>Submit your papers to contribute to our upcoming conference.</p>
      </div>
      {/* Button to open submission modal */}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Submit a Paper
      </Button>

      {/* Modal for submission */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Your Paper</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter paper title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Abstract</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter paper abstract"
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Paper</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Display list of submitted papers */}
      <div className="mt-4">
        <h2>Your Submissions</h2>
        {loading ? (
          <p>Loading submissions...</p>
        ) : error ? (
          <p>{error}</p>
        ) : submissions.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Abstract</th>
                <th>Date Submitted</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.title}</td>
                  <td>{submission.abstract}</td>
                  <td>{new Date(submission.dateSubmitted).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No submissions yet.</p>
        )}
      </div>
    </div>
  );
};

export default CallForPapers;
