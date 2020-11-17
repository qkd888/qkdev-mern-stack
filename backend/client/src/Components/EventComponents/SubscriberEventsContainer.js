import React from "react";
import SubscriberEvents from "./SubscriberEvents"; // importing the SubscriberEvents component
import trumpet from "./trumpet.jpg"; // importing the trumpet image

export default function SubsciberEventsContainer({ events, name }) {
  if (events.length > 0) {
    // If the events array has event items then
    // mapping through the array and returning
    // a SubscriberEvents component for each item.
    // The SubscriberEvents component takes in  the eventName,
    // eventDescription and eventDate as props.
    //  The event items's id is used as the key for each SubscriberEvent component
    return (
      <div className="event">
        <h1>Welcome, {name}</h1>
        <h2 className="upcomingEventsHeading"> Upcoming Events</h2>
        <div className="subEventsContainer">
          <img
            src={trumpet}
            alt="trumpet"
            className="trumpet"
            width={550}
            height={400}
          />
          <div className="events">
            {events.map((event) => {
              return (
                <div key={event._id}>
                  <SubscriberEvents
                    eventName={event.eventName}
                    eventDescription={event.eventDescription}
                    eventDate={event.eventDate}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    // Else return No upcoming events if the events list is empty
    return <h1>No upcoming events</h1>;
  }
}
