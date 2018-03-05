'use strict';

// TEMP: Simple In-Memory Database
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);

console.log('hello world!');

// INSERT EXPRESS APP CODE HERE...
