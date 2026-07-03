import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'; // FullCalendar package for React
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventsPage = () => {
  
  const [events, setEvents] = useState([]);
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

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: 'Conference',
    location: '',
    description: ''
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (info) => {
    const clickedEvent = events.find(event => event.title === info.event.title);
    setSelectedEvent(clickedEvent);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleNewEvent = (e) => {
    e.preventDefault();
    const newEventEntry = { ...newEvent, id: events.length + 1 };
    setEvents([...events, newEventEntry]);
    setNewEvent({ title: '', date: '', type: 'Conference', location: '', description: '' });
  };

  return (
    <div className="events-page">
      <h2>Academic Conferences, Workshops, and Events</h2>
      <p>Stay up to date with upcoming academic events or manage your own events.</p>

      {/* Calendar View */}
      <div className='container'>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events.map(event => ({
          title: event.title,
          start: event.date
        }))}
        eventClick={handleEventClick}
      />
</div>
      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="event-modal">
          <h3>{selectedEvent.title}</h3>
          <p><strong>Date:</strong> {selectedEvent.date}</p>
          <p><strong>Type:</strong> {selectedEvent.type}</p>
          <p><strong>Location:</strong> {selectedEvent.location}</p>
          <p>{selectedEvent.description}</p>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}

      {/* Event Listings */}
      <ul className="event-listings">
        {events.map(event => (
          <li key={event.id}>
            <h3>{event.title} <span>({event.type})</span></h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}
            <div className='text-center'>
            <iframe
          title="conference-location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509339!2d144.95373531590425!3d-37.81720997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f8f1fd2b%3A0x506f23a3e43c7f0!2s123+Conference+Ave%2C+Melbourne+VIC%2C+Australia!5e0!3m2!1sen!2sus!4v1616380824209!5m2!1sen!2sus"
          width="400"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        </div>
            
            </p>
            <p><strong>Speakers:</strong> {event.speaker}</p>
            
        <p><button onClick={() => setSelectedEvent(event)} className='btn btn-primary mt-2'>View Details</button></p>
          </li>
        ))}
      </ul>

      {/* Admin Form for Adding Events */}
      
    </div>
  );
};

export default EventsPage;
