require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "irctc_workindia",
  password: process.env.DB_PASSWORD,
  port: "5432"
});

//router to route all the train users into the right endpoints :)
const router = express.Router();

// Register User, where first time users come and signup

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;


    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', [username, hashedPassword, role]);

        res.status(200).json({ message: 'User registered! Done!!!!' });
    } catch (err) {
        console.log("Error in /register endpoint", err);
        res.status(500).send("DB is down, retry again");
    }
});

// Login User, where registered user comes and need to be verified!!!
router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    //do the query to POSTgres db...
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials, False user hai!' });
    }

    //   //authentication for password is done here!
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
        return res.status(400).json({ message: 'Incorrect username/password provided. Please retry' });
    }

    const token = jwt.sign(
        {
            userId: user.rows[0].id,
            role: user.rows[0].role
        },
        process.env.SECRET_KEY
    );
    res.json({ token });
});

module.exports = router;