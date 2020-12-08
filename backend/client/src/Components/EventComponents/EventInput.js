import React from "react";
import Rockstar from "./Rockstar.jpg"; // importing the Rockstar image

export default function EventInput({
  eventName,
  eventDescription,
  eventDate,
  addEvent,
  editEvent,
  handleChange,
  edit,
}) {
  return (
    <div className="">
      {/*EventInput container */}
      <div className="eventInput">
        {/*Rockstar Image */}
        <img src={Rockstar} alt="o7 Arena roof" className="eventInputImage" />
        {/*Event form */}
        <form>
          {/* Event name input */}
          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            value={eventName}
            onChange={handleChange}
          />
          {/*Event description input */}
          <textarea
            type="text"
            name="eventDescription"
            value={eventDescription}
            onChange={handleChange}
            placeholder="Event Description"
          />
          {/*Event date input */}
          <input
            type="text"
            name="eventDate"
            placeholder="Event Date"
            value={eventDate}
            onChange={handleChange}
          />

          {/*If the state of edit is true, return the  event button on the form, else return the
           add event button */}
          {/*The add vent button invokes the addEvent function when clicked and the edit event button
            invokes the editEvent function when clicked */}
          {edit ? (
            <button className="editEvent" onClick={editEvent}>
              Edit Event
            </button>
          ) : (
            <button className="addEvent" onClick={addEvent}>
              Add Event
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
