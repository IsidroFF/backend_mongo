const mongoose = require('mongoose');
// const dotenv = require('dotenv');
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected!'));