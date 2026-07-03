import React from 'react';
import { useParams } from 'react-router-dom';
import "./Articlepageat.css";

const Articlepageat = () => {
  const { id } = useParams(); // Retrieve the URL parameter
  const articleId = parseInt(id, 10);

  const articleContent = {
    1: "10 Tips for Writing a Great Resume: Here are actionable tips to help you create an effective resume.",
    2: "Networking for Success: Learn effective strategies to network with professionals and grow your career.",
    3: "Interview Preparation Guide: Follow our tips to confidently prepare for your next big interview.",
  };

  const tips = [
    {
      title: "Tailor Your Resume",
      description: "Customize your resume for each job application to align with the job description and company requirements."
    },
    {
      title: "Highlight Achievements",
      description: "Focus on accomplishments rather than duties, using metrics or outcomes (e.g., 'Increased sales by 20% in 6 months')."
    },
    {
      title: "Use Action Verbs",
      description: "Start bullet points with strong action verbs like 'Led,' 'Improved,' 'Developed,' or 'Managed.'"
    },
    {
      title: "Keep It Concise",
      description: "Limit your resume to 1-2 pages, focusing on the most relevant experience and skills."
    },
    {
      title: "Include Keywords",
      description: "Use industry-specific keywords from the job description to pass Applicant Tracking Systems (ATS)."
    },
    {
      title: "Professional Formatting",
      description: "Use a clean, easy-to-read layout with consistent fonts, bullet points, and headings."
    },
    {
      title: "Showcase Relevant Skills",
      description: "Highlight both technical and soft skills that are relevant to the job, such as proficiency in specific tools or teamwork abilities."
    },
    {
      title: "Quantify Results",
      description: "Include numbers to demonstrate impact (e.g., 'Reduced processing time by 30%' or 'Managed a team of 10 employees')."
    },
    {
      title: "Proofread Thoroughly",
      description: "Eliminate typos and grammatical errors by reviewing multiple times or asking someone else to proofread."
    },
    {
      title: "Update Regularly",
      description: "Keep your resume current by adding new roles, skills, and achievements as they occur."
    }
  ];


  return (
    <div className="article-page">
      {articleId === 1 &&
      <div className='articlepageat'>
      <h1>10 Tips for Writing a Strong Resume</h1>
      <ul >
        {tips.map((tip, index) => (
          <li key={index} >
            <h2 >{tip.title}</h2>
            <p>{tip.description}</p>
          </li>
        ))}
      </ul>
      </div>
      }
    </div>
  );
};

export default Articlepageat;
