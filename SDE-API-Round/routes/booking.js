require('dotenv').config();
const express = require('express');
//db connection
const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "irctc_workindia",
  password: process.env.DB_PASSWORD,
  port: "5432"
});

const { verifyToken } = require('../middleware/authentication');
const router = express.Router();

// Book a Seat from HERE!!, verifiction is necessary before booking
router.post('/book', verifyToken, async (req, res) => {
  const { trainId } = req.body;
  const { userId } = req.user;

  try {
    
    const train = await pool.query('SELECT * FROM trains WHERE id = $1', [trainId]);
    
    if (train.rows[0].available_seats > 0) {
        // when a user books train we would decreas the seat count by -1

      await pool.query('UPDATE trains SET available_seats = available_seats - 1 WHERE id = $1', [trainId]);
      
      await pool.query('INSERT INTO bookings (user_id, train_id, seat_no) VALUES ($1, $2, (SELECT total_seats - available_seats FROM trains WHERE id = $2))', 
        [userId, trainId]);
      res.status(200).json({ message: 'Seat bookedf for the user!' });
    } else {
      res.status(400).json({ message: 'No seats available!, sorry!!' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error booking seat, DB is down, come again', err });
  }
});

// Get Booking Details for an user!!!, verification is necessary

router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const result = await pool.query('SELECT * FROM bookings WHERE id = $1 AND user_id = $2', [id, userId]);
    
    if (result.rows.length === 0){
        return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error in fetching booking!!!', err });
  }
});

module.exports = router;