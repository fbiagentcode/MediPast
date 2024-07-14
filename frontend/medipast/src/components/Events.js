import React from 'react';
import './Events.css'; // Assuming CSS styles are in a separate file

const events = [
  {
    date: new Date().toISOString(),
    description: "Doctor Appointment",
    prescriptions: [{ drugName: 'Aspirin', dosage: '100mg' }],
    followUp: new Date().toISOString(),
    notes: 'Reduce screentime',
  },
  {
    date: new Date().toISOString(),
    description: "Doctor Appointment",
    prescriptions: [{ drugName: 'Ibuprofen', dosage: '200mg' }],
    followUp: new Date().toISOString(),
    notes: '',
  },
];

const EventItem = ({ event }) => (
  <div className="event">
    <div className="event-details">
      <h3>{event.description}</h3>
      <p><span>Date:</span> {new Date(event.date).toLocaleString()}</p>
      <p><span>Follow Up:</span> {new Date(event.followUp).toLocaleString()}</p>
      <p><span>Notes:</span> {event.notes}</p>
      <p><span>Prescriptions:</span></p>
      <ul>
        {event.prescriptions.map((prescription, index) => (
          <li key={index}>{prescription.drugName} - {prescription.dosage}</li>
        ))}
      </ul>
    </div>
    <div className="event-buttons">
      <button>+</button>
      <button>View</button>
    </div>
  </div>
);

const EventsList = () => (
  <div className="events-container">
    {events.map((event, index) => (
      <EventItem key={index} event={event} />
    ))}
  </div>
);

export default EventsList;
