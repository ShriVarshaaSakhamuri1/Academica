import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: 'Conference',
    location: '',
    description: ''
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events from the API when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getEvents'); // GET request to fetch events
        setEvents(response.data.events); // Set events in state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleNewEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/createEvent', newEvent); // POST request to create an event
      setEvents([...events, { ...newEvent, id: response.data.eventId }]); // Add the newly created event to the events list
      setNewEvent({ title: '', date: '', type: 'Conference', location: '', description: '' }); // Reset form fields
      alert('Event Created Successfully');
    } catch (error) {
      console.error('Error adding new event:', error);
    }
  };

  return (
    <div className="events-page">
      <h3>Event Listings</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id} onClick={() => handleEventClick(event)}>
            <strong>{event.title}</strong> - {event.location} ({event.date}) [{event.type}]
          </li>
        ))}
      </ul>

      {selectedEvent && (
        <div className="event-details">
          <h4>{selectedEvent.title}</h4>
          <p>{selectedEvent.description}</p>
          <p><strong>Location:</strong> {selectedEvent.location}</p>
          <p><strong>Type:</strong> {selectedEvent.type}</p>
          <p><strong>Date:</strong> {selectedEvent.date}</p>
        </div>
      )}

      <form onSubmit={handleNewEvent} className="new-event-form">
        <h3>Add a New Event</h3>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
          required
        />
        <select name="type" value={newEvent.type} onChange={handleInputChange}>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Symposium">Symposium</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newEvent.location}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={newEvent.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default CreateEventsPage;
