import React from 'react';
import Groups from './Groups';
import Forums from './Forums';

const Networking = () => {
  return (
    <div className="networking">
      <h1>Networking and Collaboration</h1>
      <section>
        <h2>Join Groups</h2>
        <Groups />
      </section>
      <section>
        <h2>Participate in Public Forums</h2>
        <Forums />
      </section>
    </div>
  );
};

export default Networking;
