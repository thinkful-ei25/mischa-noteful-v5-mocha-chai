'use strict';

const express = require('express');

// Simple In-Memory Database
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);

// Create an Express application
const app = express();

// Create a static webserver
app.use(express.static('public'));

// Get All (and search by query)
app.get('/api/notes', (req, res) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    res.json(list);
  });
});

// Get a single item
app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;

  notes.find(id, (err, item) => {
    res.json(item);
  });
});

// Listen for incoming connections
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
