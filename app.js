const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

const mongodb_uri = process.env.MONGODB_URL;
const mongoose = require('mongoose');

const userRoutes = require('./routes/usersRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { verifyToken } = require('./middlewares/verifyToken');

app.use('/users', userRoutes);
app.use('/events', verifyToken, eventRoutes)

mongoose.connect(mongodb_uri).then(() => {
  app.listen(port, (err) => {
    if (err) {
      return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
  });
})

module.exports = app;
