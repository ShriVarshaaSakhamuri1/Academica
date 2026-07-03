import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [items, setItems] = useState([
    { id: 1, name: "Jobs: ", description: "A new job Full stack developer has been posted" },
    { id: 2, name: "Conferences: ", description: "Intrested in Joining in AI conference?" },
    { id: 3, name: "Events: ", description: "A new event software engineering has been scheduled near texas. learn more" },
  ]);

  const navigate = useNavigate();

  const handleItemClick = (itemId) => {
    // Navigate to the dashboard (optionally, you can pass the item ID as a parameter)
    navigate("/student");
  };

  return (
    <div className="home">
      <section className="hero">
        {/* <h1>Empowering Academic Collaboration</h1> */}
        {/* <p>Join our platform to explore opportunities, connect with experts, and advance your academic career.</p> */}
        <button className="btn btn-primary"><a href='/login' className='text-white'>Get Started</a></button>
      </section>

      <section className="features">
        <div className="feature">
          <h2>Call for papers</h2>
          <p>The IEEE Computer Society provides hybrid publishing options for all its publications, allowing authors to make their papers open access in any magazine or journal. Browse the open Calls for Papers (CFPs) across all categories below.</p>
          <Link to="/callpapers">Learn More</Link>
        </div>

        <div className="feature">
          <h2>Career Development</h2>
          <p>Access exclusive resources and mentorship programs that will guide your academic and professional journey.</p>
          <Link to="/careerdevelopment">Explore Resources</Link>
        </div>

        <div className="feature">
          <h2>Academic Events</h2>
          <p>Stay updated on academic events including conferences, workshops, and seminars tailored for your growth.</p>
          <Link to="/events">View Events</Link>
        </div>
      </section>

      <div>
        <h2>Latest Announcements</h2>
        {items.map((item) => (
            <li key={item.id} className='announceclass' onClick={() => handleItemClick(item.id)}>
              <div className="itemsat">
                <h5>{item.name}</h5>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
      </div>

      <section className="testimonials">
        <h2>What Our Members Say</h2>

        <div className="testimonial">
          <p>"The platform has been instrumental in helping me connect with mentors who provided great insights for my research."</p>
          <h3>Dr. Sarah Johnson</h3>
          <p>Researcher, Harvard University</p>
        </div>

        <div className="testimonial">
          <p>"I found multiple internship opportunities and was able to collaborate with professors from different universities."</p>
          <h3>John Doe</h3>
          <p>Graduate Student, Stanford University</p>
        </div>

        <div className="testimonial">
          <p>"Being part of this network has opened doors for career development and research collaborations."</p>
          <h3>Prof. Michael Lee</h3>
          <p>Professor, MIT</p>
        </div>
      </section>
      <div className='container'>
          
      </div>
      <footer>
        <p>&copy; 2024 Academic Networking Site. All Rights Reserved.</p>
    </footer>
    </div>
  );
};

export default Home;
