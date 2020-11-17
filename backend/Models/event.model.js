const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Event Schema
const eventSchema = new Schema({
    eventName: { type: String, required: true },
    eventDescription: {
        type: "string",
        required: true,
    },
    eventDate: { type: String, required: true },
});

module.exports = mongoose.model("Event", eventSchema);
