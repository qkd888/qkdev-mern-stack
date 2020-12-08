# o7 Arena webapp 1.0

Sign up to the website to see all the upcoming events
at the arena.

## How It Works

You can sign up as an admin or sign up as a subscriber, on this modest and initial version
of the o7 Arena web application. Signing in as an admin allows you to publish, edit, delete
and view all upcoming events and signing in as a subscriber just allows you to view all up
coming events.

## Installation onto your local machine

- Under the repository name, click Clone or download.
- In the Clone with HTTPs section, click to copy the clone URL for the repository.
- Open Git Bash.
- Change the current working directory to the location where you want the cloned directory to be made.
- Type git clone, and then paste the URL you copied in Step 2
- Press Enter. Your local clone will be created.

## Prerequisite

### SERVER:

In the 'config' folder, Please make sure you have a `keys.js` file to store the following objects:

google: {
clientID: "",

clientSecret: "",
},
mongoDB: {
dbURI: "",

},
session: {
cookieKey: "",
},

github: {
clientID: "",
clientSecret: "",
},

- `mongoDB.dbURI` represents the mongodb local or atlas URL
- `session.cookieKey` represents our cookie key, you can make this anything you want eg: flyingcat101
- `google.clientID` represents the OAuth `Client ID` from Google.
- `google.clientSecret` represents the OAuth `Client Secret` from Google, make sure that your URIs are as follows,

  `Authorized JavaScript origins`: http://localhost:5000/google-sign-in
  `Authorized redirect URIs` : http://localhost:5000/google-sign-in/redirect

- `github.clientID` represents the OAuth `Client ID` from Github.
- `github.clientSecret` represents the OAuth `Client Secret` from Github, make sure that your URIs are as follows,

  `Authorized JavaScript origins`: http://localhost:5000/github-sign-in
  `Authorized redirect URIs` : http://localhost:5000/github-sign-in/redirect

  ## Running The Application

- Once its on your local machine navigate to this directory from the command line interface. E.g. cd c:\example.
- Then navigate to the backend directory and type 'npm install'
- Now type 'npm start' to start the backend server.
- On another terminal navigate to the client directory and type 'npm install'
- Now type 'npm start' to start the react server, runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Security

- Generall App Protection: Helmet.js was used for the basic security of this application.

- Route Protection: Only logged in users can access the list of upcoming events and only admins can

publish events. This was achieved by adding basic middleware between routes
and route handlers to verify if the person accessing the resource is authorized
or not. On the frontend a 'role' state is used to determine which dashboard to display
to the user. The 2.0 version of this application will feature a more robust route protection
system on the frontend using react-router.

## Testing

### Frontend

From the command line interface navigate to the client directory and type 'npm test'
to run the test scripts

---

# Software Requirements Documentation

This documentation describes the software requirements for the o7 Arena events web application.

## System Architecture

This application will use an MVC (Model View Controller) architectural pattern which is a type of Layered
architectural pattern. This pattern was chosen because of 2 main reasons.

1. Faster development process - MVC supports rapid and parallel development, which means that the model,
   controller and the user interface can be developed at the same time.

2. The modification does not affect the entire model - For any web application, the user interface tends,
   to change more frequently and this application is no exception, the user interface will be updated regularly to keep up
   with trends and to give the users a breath of fresh air every once in a while, it is good to know that
   the change in the user interface will not affect the business logic of the application.

The View part of the achitecture will be handled by the User Interface as all the data will be formatted and then presented to the user in the front-end of the application, the Model and the Controller will be handled by the backend
of the application.

The Tech stack that is going to be used for this application is the MERN (MongoDb, Express js, React js, Node js).

The front-end of the application will be created with Create React App (CRA) and it will be styled with local CSS files
as well as a CSS framework called Bootstrap.

## System Requirements Specification

The application will have 2 types of user roles, an admin and a subsciber. Both users will be able to create an account and login to the application. The admin will have CRUD (Create, Read, Update, Delete) capabilities on the application - the admin will be able to create an event, read details about events, edit the details of a specific event and delete an event.

The subscriber will only have read capabilities on the application, they will only be able to view upcoming events at the o7 arena.

This application will be used by the Events team at the o7 arena and all the potential attendees of the upcoming events at the o7 arena.

### User stories

1. As an admin user, I want to be able to add upcoming events onto the application so that people are aware of the upcoming events.

2. As an admin user, I want to be able to edit details of a specific event, in case they change due to some external or internal reason.

3. As an admin user, I want to be able to delete an event, in case the event gets cancelled.

4. As an admin user, I want to be able to see all the upcoming events, so that I can see what the subscribers see.

5. As a subscriber user, I want to be able to see all the upcoming events at the o7 arena.

### Functional requirements

1. A user must be able to create an account.
2. A user must be able to sign in / sign out
3. An admin user must be able to:
   - create an event
   - update an event
   - delete an event
   - read all events
4. A subscriber user must be able to read all the upcoming events

### Non-Functional requirements

1. Availability - The application must always be available when a subscriber wants to check for any upcoming events.
2. Reliability - All the information about the upcoming events should be reliable and accurate.
