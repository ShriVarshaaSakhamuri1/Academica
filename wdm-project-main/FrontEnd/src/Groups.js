import React, { useState } from 'react';

const Groups = () => {
  const [groups] = useState([
    { id: 1, name: 'Machine Learning Enthusiasts', description: 'Explore the latest research and trends in machine learning and AI.' },
    { id: 2, name: 'Data Science Researchers', description: 'A group for academic and industry researchers working in data science.' },
    { id: 3, name: 'Quantum Computing Explorers', description: 'Discuss theories and practical applications of quantum computing.' }
  ]);

  const [joinedGroups, setJoinedGroups] = useState([]);

  const handleJoinGroup = (groupId) => {
    if (!joinedGroups.includes(groupId)) {
      setJoinedGroups([...joinedGroups, groupId]);
    }
  };

  return (
    <div className="groups container">
      <h2>Interest-based Groups</h2>
      <p>Join groups related to your academic interests to collaborate with peers and professionals.</p>
      <ul>
        {groups.map(group => (
          <li key={group.id}>
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            {joinedGroups.includes(group.id) ? (
              <button disabled>You have joined this group</button>
            ) : (
              <button onClick={() => handleJoinGroup(group.id)}>Join Group</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;
