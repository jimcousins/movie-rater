const express = require('express');
const cors = require('cors');

// Require routers here

const api = express();

api.use(cors());
api.use(express.json());

// Use routers here

module.exports = api