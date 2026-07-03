import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Welcome to the Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="stats">
        <div>Total Users: {dashboardData.totalUsers}</div>
        <div>Jobs Posted: {dashboardData.jobsPosted}</div>
        <div>Events Listed: {dashboardData.eventsListed}</div>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        {/* <button className="btn btn-primary">Create Forum</button> */}
        <button className="btn btn-success"><a href='/createevent' className='text-white'>Create Event</a></button>
        {/* <button className="btn btn-info">Create Group</button> */}
      </div>

      {/* Recent Activities Section */}
      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <ul>
          {dashboardData.recentActivities.map((activity, index) => (
            <li key={index}>{activity.activity} (on {new Date(activity.created_at).toLocaleString()})</li>
          ))}
        </ul>
      </div>

      {/* Upcoming Events Section */}
      <div className="upcoming-events">
        <h3>Upcoming Events</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.upcomingEvents.map((event, index) => (
              <tr key={index}>
                <td>{event.title}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
