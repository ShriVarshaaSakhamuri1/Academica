import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Forums = () => {
  const [discussions, setDiscussions] = useState([
    { id: 1, topic: 'Best practices for research writing', posts: 12, description: 'Discuss tips and strategies for writing high-impact academic papers.' },
    { id: 2, topic: 'How to apply for academic conferences?', posts: 8, description: 'Share your experiences and ask questions about the application process for academic conferences.' },
    { id: 3, topic: 'AI ethics in modern research', posts: 15, description: 'Debate the ethical considerations of AI development in academic research.' }
  ]);

  const userId = localStorage.getItem("user_id");

  const [newDiscussion, setNewDiscussion] = useState({ topic: '', description: '' });

  const handleNewDiscussion = (e) => {
    e.preventDefault();
    const newTopic = {
      id: discussions.length + 1,
      topic: newDiscussion.topic,
      description: newDiscussion.description,
      posts: 0
    };
    setDiscussions([...discussions, newTopic]);
    setNewDiscussion({ topic: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiscussion({ ...newDiscussion, [name]: value });
  };

  return (
    <div className="forums">
      <h2>Public Forums</h2>
      <p>Participate in academic discussions or start a new topic in our forums.</p>
      <ul>
        {discussions.map(discussion => (
          <li key={discussion.id}>
            <Link
              to= "/forumpage"
              state={{ userId: userId, groupId: discussion.id , forumtitle: discussion.topic}}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
            <h3>{discussion.topic}</h3>
            <p>{discussion.description}</p>
            <p><strong>{discussion.posts}</strong> posts</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forums;
