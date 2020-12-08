import React from "react";
import EventItem from "./EventItem"; // importing the EventItem component

export default function EventsContainer({ events, handleEdit, deleteEvent }) {
  if (events.length > 0) {
    // If the events array has event items then
    // mapping through the array and returning
    // a eventItem component for each item.
    // The EventItem component takes in the eventName,
    // eventDescription and eventDate, handleEdit function and deleteEvent function as props.
    // The event items's id is used as the key for each EventItem component.
    return (
      <div className="event">
        <h1 className="upcomingEvents"> Upcoming Events</h1>
        <div className="eventsContainer">
          {events.map((event) => {
            return (
              <div key={event._id}>
                <EventItem
                  eventName={event.eventName}
                  eventDescription={event.eventDescription}
                  eventDate={event.eventDate}
                  handleEdit={() => handleEdit(event._id)}
                  deleteEvent={() => deleteEvent(event._id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    // Else return No upcoming events if the events list is empty
    return <h1>No upcoming events</h1>;
  }
}
