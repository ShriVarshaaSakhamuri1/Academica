// About.js
import React from 'react';
import './About.css'; 
const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        
        <div className="text-content">
        <img src={'https://lic-pension-plans.com/wp-content/uploads/2020/07/about-us-for-LIC-pension-plans.jpg'} alt="Team" className="about-image" />
          <h1>About Us</h1>
          <p>
            Welcome to our platform! We are dedicated to empowering academic collaboration and fostering connections among researchers, students, and professionals in various fields. Our mission is to provide a supportive environment where individuals can grow, share ideas, and collaborate on projects that drive innovation and knowledge.
          </p>
          <h2>Our Mission</h2>
          <p>
            Our mission is to connect academic professionals and provide resources that facilitate research and career development. We believe in the power of collaboration to solve complex problems and advance knowledge.
          </p>
          </div>
          <div>
            </div>
            <div>
              </div>
              </div>
              <div>
              <div>
          <h2>Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <h3>Dr. Sarah Johnson</h3>
              <p>Co-Founder & CEO</p>
              <p>Dr. Johnson has over 15 years of experience in academic research and has published numerous papers in top-tier journals.</p>
            </div>
            <div className="team-member">
              <h3>John Doe</h3>
              <p>Co-Founder & CTO</p>
              <p>With a background in computer science, John is passionate about using technology to enhance collaboration in academia.</p>
            </div>
            <div className="team-member">
              <h3>Prof. Michael Lee</h3>
              <p>Advisor</p>
              <p>Prof. Lee is a renowned scholar in the field of education and provides guidance to our team on best practices in research and collaboration.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
