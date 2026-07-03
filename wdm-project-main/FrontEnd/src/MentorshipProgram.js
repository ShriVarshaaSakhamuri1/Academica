import React from 'react';

const mentors = [
  { id: 1, name: 'John Doe', expertise: 'Web Development', bio: 'Experienced full-stack developer.' },
  { id: 2, name: 'Jane Smith', expertise: 'Data Science', bio: 'Data scientist with 10+ years of experience.' },
  // Add more mentors
];

const MentorshipProgram = () => {
  return (
    <div className="mentorship-program container">
      <h1>Mentorship Program</h1>
      
      {/* Program Overview */}
      <section className="program-info">
        <h2>About the Program</h2>
        <p>
          Our mentorship program is designed to connect students with experienced professionals in various fields.
          Mentors provide guidance, share knowledge, and help students achieve their career goals.
        </p>
        <h3>Why Join the Program?</h3>
        <ul>
          <li>Get personalized guidance and advice.</li>
          <li>Develop skills and knowledge in your field of interest.</li>
          <li>Build valuable connections with industry experts.</li>
        </ul>
      </section>

      {/* Mentors List */}
      <section className="mentors-list">
        <h2>Meet Our Mentors</h2>
        <div className="mentor-cards">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <h3>{mentor.name}</h3>
              <p><strong>Expertise:</strong> {mentor.expertise}</p>
              <p>{mentor.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h4>Who can join the mentorship program?</h4>
          <p>Any student looking to receive guidance from experienced professionals can apply.</p>
        </div>
        <div className="faq-item">
          <h4>How do I choose a mentor?</h4>
          <p>Based on your goals, you can select a mentor from our list during the application process.</p>
        </div>
        {/* Add more FAQ items */}
      </section>
    </div>
  );
};

export default MentorshipProgram;
