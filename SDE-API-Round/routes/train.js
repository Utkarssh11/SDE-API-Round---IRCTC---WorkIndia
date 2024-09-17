require('dotenv').config();
const express = require('express');

const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "irctc_workindia",
  password: process.env.DB_PASSWORD,
  port: "5432"
});

//verifiication to be done from middlesware
const { verifyAdmin } = require('../middleware/admin');

const router = express.Router();


// new train to be added by admin only!!!! --> src -> dest(we can add number of seats as well)

router.post('/add', verifyAdmin, async (req, res) => {
  const { name, source, destination, total_seats } = req.body;

  try {
    // so in start available and total seats would always be the same, would handle available seats according to booking :)

    await pool.query('INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES ($1, $2, $3, $4, $4)', 
      [name, source, destination, total_seats]);

    return res.status(200).json({ message: 'Train added success!!' });
  } catch (err) {

    res.status(500).json({ message: 'Error adding train, come again later!', err });
  }
});

//for getting trains no auth is required so that is skipped, and when request src, dest are alwaus required!!

router.get('/availability', async (req, res) => {
  const { source, destination } = req.query;

  try {
    const result = await pool.query('SELECT * FROM trains WHERE source = $1 AND destination = $2 ORDER BY id DESC',
         [source, destination]);
    console.log(result.rows[0]);
    res.json(result.rows);
  } catch (err) {

    res.status(500).json({ message: 'Error fetching trains', err });
  }
});

module.exports = router;