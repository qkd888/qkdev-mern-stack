import React from "react";

export default function SubscriberEvents({
  eventName,
  eventDescription,
  eventDate,
}) {
  return (
    // *SubscriberEvent component which displays  information about the upcoming event
    <div className="subscriberEvent">
      <p>{eventName}</p>

      <p>{eventDescription}</p>

      <p>{eventDate}</p>
    </div>
  );
}
