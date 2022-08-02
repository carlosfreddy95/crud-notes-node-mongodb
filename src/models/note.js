"use strict";

const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let NoteSchema = new Schema({
  title: String,
  date: {
    type: Date,
    default: Date.now,
  },
  description: String,
});

module.exports = mongoose.model("Note", NoteSchema);
