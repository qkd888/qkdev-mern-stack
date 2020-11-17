import React, { Component } from "react";
import EventInput from "../EventComponents/EventInput"; // importing the EventsInput component
import EventsContainer from "../EventComponents/EventsContainer"; // importing the EventsContainer component

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: "", // initializing state for eventId
      eventName: "", // initializing state for eventName
      eventDescription: "", // initializing state for eventDescription
      eventDate: "", // initializing state for eventDate
      events: [], // initializing state for events
      edit: false, // initializing state for edit
    };
  }

  // Universal change handler to handle any change on the input fields
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  /*The handleEdit function sets the state of eventName, eventDescription
  and eventDate to the respective details of the event item that was clicked on.
  By doing this, when a user clicks on an event item that they would like to edit
  the information of that item appears on the respective input fields.
  This function also filters out the object that was clicked on so that
   the user does not see it on the upcoming events list */

  handleEdit = (id) => {
    const { events } = this.state;
    const filteredEvents = events.filter((event) => event._id !== id);
    const selectedEvent = events.find((event) => event._id === id);

    this.setState({
      events: filteredEvents,
      eventName: selectedEvent.eventName,
      eventDescription: selectedEvent.eventDescription,
      eventDate: selectedEvent.eventDate,
      eventId: selectedEvent._id,
      edit: true,
    });
  };

  /*The addEvent function adds a new event to the cars events collection
  on the database, it does this by making a post request to the server.
  The information of the new event is contained in the body of the post request.
  The server then saves the event on the database then it sends back
  an updated events list as a response to the client*/

  addEvent = (e) => {
    e.preventDefault();

    const { eventName, eventDescription, eventDate } = this.state;

    if (eventName === "" || eventDescription === "" || eventDate === "") {
      alert("Please fill in all the fields");
    } else {
      fetch("/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName: eventName,
          eventDescription: eventDescription,
          eventDate: eventDate,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 201) {
            alert(response.message);
            this.setState({
              events: response.events,
            });
          } else {
            alert(response.message);
          }
        })
        .catch((error) => console.log("Error:", error));
    }

    // Resetting respective states to default values
    this.setState({
      eventName: "",
      eventDescription: "",
      eventDate: "",
    });
  };

  /* The editEvent function edits a specific event on the database
  by making a put request to the server.The event's  id is parsed in the url
  so that the server knows which event to edit. The new information of the
   event is contained in the body of the put request.
   The server then edits the specific event on the database then it sends back
   an updated upcoming events list as a response to the client*/

  editEvent = (e) => {
    e.preventDefault();
    const { eventName, eventDescription, eventDate, eventId } = this.state;

    if (eventName === "" || eventDescription === "" || eventDate === "") {
      alert("Please fill in all the fields");
    } else {
      fetch(`/edit-event/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName: eventName,
          eventDescription: eventDescription,
          eventDate: eventDate,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 200) {
            alert(response.message);
            this.setState({
              events: response.events,
            });
          } else {
            alert(response.message);
          }
        })
        .catch((error) => console.log("Error:", error));
    }
    // Resetting respective states to default values
    this.setState({
      eventName: "",
      eventDescription: "",
      eventDate: "",
      edit: false,
    });
  };

  /* The deleteEvent function deletes a specific event on the database 
  by making a Delete request to the server.The event's id is parsed in the url
  so that the server knows which event to delete. The sever then deletes the 
  specific event on the database then it sends back an updated upcoming events list as a 
  response to the client*/

  deleteEvent = (id) => {
    fetch(`/delete-event/${id}}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          alert(response.message);

          this.setState({
            events: response.events,
          });
        } else {
          alert(response.message);
        }
      })
      .catch((error) => console.log("Error:", error));
  };

  // Lifecycle method which makes a get request to the server
  // to fetch all the upcoming events when this component mounts,
  // the events from the server are then stored in the events state

  componentDidMount() {
    fetch("/all-events")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          this.setState({
            events: response.events,
          });
        } else {
          console.log(response);
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { eventName, eventDescription, eventDate, events, edit } = this.state; // Destructuring state
    const { signOut } = this.props; // Destructuring props
    return (
      <div>
        {/*Header Element for the admin dashboard */}
        <div className="header">
          {/*Header logo */}
          <h3 className="logo">o7 Arena</h3>
          {/*SignOut button which invokes a signOut function when clicked.
           the signOut function is passed to this component from the parent component
           via props */}
          <button className="signOutBtn" onClick={signOut}>
            {" "}
            Sign Out
          </button>
        </div>

        {/*Welcoming the user that is logged in */}
        <h1>Welcome to the admin dashboard, {this.props.name}</h1>
        {/*Event input component */}
        <EventInput
          eventName={eventName}
          eventDescription={eventDescription}
          eventDate={eventDate}
          addEvent={this.addEvent}
          editEvent={this.editEvent}
          handleChange={this.handleChange}
          edit={edit}
        />
        {/*EventsContainer component */}
        <EventsContainer
          events={events}
          handleEdit={this.handleEdit}
          deleteEvent={this.deleteEvent}
        />
      </div>
    );
  }
}
