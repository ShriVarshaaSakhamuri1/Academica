import React from 'react';
import MentorshipProgram from './MentorshipProgram';
import { Link } from 'react-router-dom';

const CareerDevelopmentPage = () => {
  return (
    <div className="container">
        <h1 className='title-at'>Career Development Resources</h1>
        <p>Explore articles, tips, and tools to enhance your career growth.</p>
      <ArticlesSection />
      <Footer />
    </div>
  );
};

const ArticlesSection = () => {
  const articles = [
    { id: 1, title: "10 Tips for Writing a Great Resume", content: "Learn the secrets to crafting a standout resume." },
    { id: 2, title: "Networking for Success", content: "Discover effective strategies to network with professionals in your field." },
    { id: 3, title: "Interview Preparation Guide", content: "Get ready for your next interview with our comprehensive preparation tips." },
  ];

  return (
    <section className="articles-section">
      <h2>Articles & Tips for Career Growth</h2>
      <ul className='list-group'>
        {articles.map((article) => (
          <li key={article.id} className="list-group-item">
            <Link to={`/article/${article.id}`}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

const MentorshipProgramSection = () => {
  return (
    <section className="mentorship-program-section">
      <h2>Join Our Mentorship Program</h2>
      <p>Connect with experienced professionals for guidance and support in your career journey.</p>
      <MentorshipProgram/>
      <button className="btn btn-primary"><a href='/mentorshipapplication' className='text-white'>Apply Now</a></button>
    </section>
  );
};

const Footer = () => {
  return (
    <div className="">
      {/* <p>© 2024 Academic Networking Site. All rights reserved.</p> */}
    </div>
  );
};

export default CareerDevelopmentPage;
