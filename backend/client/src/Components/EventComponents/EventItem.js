import React from "react";

export default function EventItem({
  eventName,
  eventDescription,
  eventDate,
  handleEdit,
  deleteEvent,
}) {
  return (
    // EventItem component which displays information about upcoming events
    <div className="eventItem">
      <p>{eventName}</p>

      <p>{eventDescription}</p>

      <p>{eventDate}</p>
      <button className="edit" onClick={handleEdit}>
        Edit
      </button>
      <button className="delete" onClick={deleteEvent}>
        Delete
      </button>
    </div>
  );
}
