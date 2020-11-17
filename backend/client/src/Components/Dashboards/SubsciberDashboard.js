import React, { Component } from "react";
import SubscriberEventsContainer from "../EventComponents/SubscriberEventsContainer"; // importing the SubscriberEventsContainer component

export default class SubsciberDashboard extends Component {
  constructor() {
    super();
    this.state = {
      events: [], // Initializing state for events
    };
  }

  // Lifecycle method which makes a get request to the server
  // to fetch all the upcoming events when this component mounts,
  // the events from the server are then stored in the events state

  componentDidMount() {
    fetch("/all-events")
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            events: response.events,
          });
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { events } = this.state; // Destrucuring state
    return (
      <div className="App">
        {/*Header Element for the subsciber dashboard */}
        <div className="header">
          {/*Header logo */}
          <h3 className="logo">o7 Arena</h3>
          {/*SignOut button which invokes a signOut function when clicked.
           the signOut function is passed to this component from the parent component
           via props */}
          <button className="signOutBtn" onClick={this.props.signOut}>
            {" "}
            Sign Out
          </button>
        </div>
        {/*SubsciberEventsContainer which takes in events and name of the logged in user as props.
        The name of the logged in user is passed to the SubscriberDashboard component from its parent component
        as props, then which it is passed down to the SubscriberEventsContainer component also as props */}
        <SubscriberEventsContainer events={events} name={this.props.name} />
      </div>
    );
  }
}
