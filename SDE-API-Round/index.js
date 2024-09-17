const dotenv = require('dotenv');
const express = require("express");
const authRoutes = require('./routes/auth');
const trainRoutes = require('./routes/train');
const bookingRoutes = require('./routes/booking');

//.env file configuration done <<--
dotenv.config();

const app = express();
app.use(express.json());

//for routing the apis
app.use('/auth', authRoutes);
app.use('/train', trainRoutes);
app.use('/booking', bookingRoutes);

//port listen

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
