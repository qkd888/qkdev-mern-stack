const Event = require("../Models/event.model");
const User = require("../Models/user.model");

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.json({
      status: 401,
      message: "Please Sign In to access this resource",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    return next();
  } else {
    res.json({
      status: 401,
      message: "You are not Authorized to access this resource",
    });
  }
};

const getAllEvents = (req, res) => {
  Event.find(function (err, events) {
    if (err) {
      console.log(err);
      res.json({
        status: 500,
        message: "Some error occurred while retrieving the events.",
      });
    } else {
      res.json({ status: 200, events: events });
    }
  });
};

const createEvent = (req, res) => {
  const data = req.body;

  const event = new Event({
    eventName: data.eventName,
    eventDescription: data.eventDescription,
    eventDate: data.eventDate,
  });

  event.save(function (err, data) {
    if (err) {
      console.log(err);
      res.json({
        status: 500,
        message: "Some error occurred while adding a new event.",
      });
    } else {
      console.log(data);
      Event.find(function (err, events) {
        if (err) {
          console.log(err);
          res.json({
            status: 500,
            message: "Some error occurred while retrieving the events.",
          });
        } else {
          res.json({
            status: 201,
            events: events,
            message: "Event added succesfully",
          });
        }
      });
    }
  });
};

const editEvent = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Event.findOneAndUpdate(
    { _id: id },
    {
      eventName: data.eventName,
      eventDescription: data.eventDescription,
      eventDate: data.eventDate,
    },
    { new: true },
    function (err, doc) {
      if (err) {
        console.log("Something wrong when updating an event!");
        res.json({
          status: 500,
          message: "something went wrong while updating an event",
          error: err,
        });
      } else {
        Event.find(function (err, events) {
          if (err) {
            console.log(err);
            res.json({
              status: 500,
              message: "Some error occurred while retrieving the events.",
            });
          } else {
            res.json({
              message: "Event updated succesfully",
              status: 200,
              events: events,
            });
          }
        });
      }
    }
  );
};

const deleteEvent = (req, res) => {
  const id = req.params.id;
  Event.findOneAndRemove(id, function (err) {
    if (err) {
      console.log("ERROR: event NOT removed. " + err);
      res.json({
        status: 500,
        message: "An error occured while deleting an event",
      });
    } else {
      Event.find(function (err, events) {
        if (err) {
          console.log(err);
          res.json({
            status: 500,
            message: "Some error occurred while retrieving the events.",
          });
        } else {
          res.json({
            status: 200,
            events: events,
            message: "Event removed succesfully",
          });
        }
      });
    }
  });
};

module.exports = {
  createEvent,
  editEvent,
  deleteEvent,
  getAllEvents,
  isLoggedIn,
  isAdmin,
};
