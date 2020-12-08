import React, { Component } from "react";
import Home from "./Components/Home"; // importing the Home component
import UpdateProfile from "./Components/AuthComponents/UpdateProfile"; // importing the UpdateProfile component
import AdminDashboard from "./Components/Dashboards/AdminDashboard"; // importing the AdminDashboard component
import SubscriberDashboard from "./Components/Dashboards/SubsciberDashboard"; // importing the SubscriberDashboard component
import "./App.css"; // importing local stylesheet

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: "", // initializing state for userId
      name: "", // initializing state for name
      email: "", // initializing state for email
      password: "", // initializing state for password
      role: "", // initializing state for role
      chosenRole: "none", // initializing state for chosenRole
      user: false, // initializing state for user
    };
  }

  // Universal change handler to handle any change on the input fields
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  // Change handler for the role seletion dropdown element
  handleRoleChange = (evt) => {
    this.setState({ chosenRole: evt.target.value });
  };

  // The signUp function signs up the new user to the application.
  // A post request is made to the server with the new user's details
  // contained in the body of the post request.

  signUp = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state; // Destructuring state

    if (name === "" || email === "" || password === "") {
      alert("Please fill in all the fields");
    } else {
      fetch("/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          alert(response.message);
        })
        .catch((error) => console.log("Error:", error));
    }
  };

  // The signIn function signs in a user to the application.
  // A post request is made to the server with the  user's credentials
  // contained in the body of the post request, the server authenicates the user
  // and returns a response to the client

  signIn = (e) => {
    e.preventDefault();
    const { email, password } = this.state; // Destructuring state
    if (email === "" || password === "") {
      alert("Please fill in all the fields");
    } else {
      fetch("/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.setState({
              user: true,
              userId: response.user._id,
              name: response.user.name,
              email: response.user.email,
              password: response.user.password,
              role: response.user.role,
            });
          } else {
            alert(response.message);
          }
        })
        .catch((error) => console.log("Error:", error));
    }
  };
  // The githubSignIn function allows the user to sign in with their
  // github account, it achieves this by opening the github sign in route that is specified
  // in the server

  githubSignIn = (e) => {
    e.preventDefault();
    window.open("http://localhost:5000/github-sign-in", "_self");
  };

  // The googleSignIn function allows the user to sign in with their
  // google account, it achieves this by opening the google sign in route that is specified
  // in the server

  googleSignIn = (e) => {
    e.preventDefault();
    window.open("http://localhost:5000/google-sign-in", "_self");
  };

  /* The updateUser function updates a users details on the database
  by making a put request to the server.The users's id is parsed in the url
  so that the server knows which user to update. The new information of the
   user is contained in the body of the put request.
   The server then updates the specific user on the database then it sends back
   an updated user object as a response to the client*/

  updateUser = (e) => {
    e.preventDefault();
    const { userId, name, email, password, chosenRole } = this.state; // Destructuring state

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      chosenRole === "none"
    ) {
      alert("Please fill in all the fields");
    } else {
      fetch(`/update-profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: chosenRole,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          this.setState({
            user: true,
            userId: response.user._id,
            name: response.user.name,
            email: response.user.email,
            password: response.user.password,
            role: response.user.role,
          });
        })
        .catch((error) => console.log("Error:", error));
    }
  };

  // The signOut function signs the user out of the application
  signOut = (e) => {
    e.preventDefault();
    fetch("/sign-out")
      .then((res) => res.json())
      .then((response) => {
        this.setState({ user: false, name: "", email: "", password: "" });
      })
      .catch((error) => console.log("Error:", error));
  };

  // Lifecycle method which makes a get request to the server
  // to check if there is any user logged in (req.user)
  // if there is a user, set the respective states to the data
  // that was retrieved about the user
  componentDidMount() {
    fetch("/user")
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            user: true,
            userId: response.user._id,
            name: response.user.name,
            email: response.user.email,
            password: response.user.password,
            role: response.user.role,
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
    const { email, password, name, role, chosenRole, user } = this.state; // Destructuring state

    // If the user is signIn but their role is none, the updateProfile component is returned
    // so that a user can update their profile and choose a role
    if (user && role === "none") {
      return (
        <div className="App">
          <UpdateProfile
            name={name}
            chosenRole={chosenRole}
            handleChange={this.handleChange}
            handleRoleChange={this.handleRoleChange}
            updateUser={this.updateUser}
          />
        </div>
      );
    }
    // Else if a user is signed in and they have a valid rolem, a respective component is returned
    // based on the users role
    else if ((user && role === "Admin") || (user && role === "Subscriber")) {
      return (
        <div className="App">
          {role === "Admin" ? (
            <AdminDashboard signOut={this.signOut} name={name} />
          ) : (
            <SubscriberDashboard signOut={this.signOut} name={name} />
          )}
        </div>
      );
    }
    // Else no user is signed in, so return a Home component, so that a user can sign up or
    // sign in into the application
    else {
      return (
        <div className="App">
          <Home
            name={name}
            email={email}
            role={role}
            password={password}
            handleChange={this.handleChange}
            signIn={this.signIn}
            signUp={this.signUp}
            googleSignIn={this.googleSignIn}
            githubSignIn={this.githubSignIn}
          />
        </div>
      );
    }
  }
}
