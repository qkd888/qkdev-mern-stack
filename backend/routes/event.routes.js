var express = require("express"); // importing express
var router = express.Router(); // importing router

const {
  createEvent,
  getAllEvents,
  editEvent,
  deleteEvent,
  isLoggedIn,
  isAdmin,
} = require("../Controllers/event.controllers"); // destrucuring controllers

router.post("/add-event", isAdmin, createEvent); // add event route
router.put("/edit-event/:id", isAdmin, editEvent); // edit event route
router.delete("/delete-event/:id", isAdmin, deleteEvent); // delete event route
router.get("/all-events", isLoggedIn, getAllEvents); // get all events route

module.exports = router;
