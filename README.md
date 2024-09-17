# SDE API Round - IRCTC

## Project Overview

This backend system simulates a railway management system similar to IRCTC. It provides functionalities for users to check train availability, book seats, and manage train information via admin access. The system handles real-time bookings, ensuring that seat availability is accurately managed even when multiple users book seats simultaneously.

## Tech Stack

- **Language:** JavaScript
- **Framework:** Node.js & Express.js
- **Database:** PostgreSQL
- **Testing Tool:** Postman

## Features

- **User Registration & Login:** User registration and authentication with JWT.
- **Role-Based Access:** Admins can add and update train information.
- **Seat Availability:** Users can check seat availability between two stations.
- **Booking System:** Users can book available seats in real-time.

## Setup Instructions

1. **Clone the Project:**

    ```bash
    git clone https://github.com/your-repo/irctc-backend.git
    cd irctc-backend
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Configure PostgreSQL:**

    Ensure PostgreSQL is installed and create the following tables:

    **Users Table:**

    ```sql
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100),
      password VARCHAR(100),
      role VARCHAR(50)
    );
    ```

    **Trains Table:**

    ```sql
    CREATE TABLE trains (
      id SERIAL PRIMARY KEY,
      source VARCHAR(100),
      destination VARCHAR(100),
      total_seats INT,
      available_seats INT
    );
    ```

    **Bookings Table:**

    ```sql
    CREATE TABLE bookings (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      train_id INT REFERENCES trains(id),
      seat_number INT
    );
    ```

4. **Create a .env File:**

    In the root of the project directory, create a `.env` file with the following variables:

    ```plaintext
    DB_USER=your_postgres_username
    DB_PASSWORD=your_postgres_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=your_database_name
    SECRET_KEY=your_jwt_secret_key
    ADMIN_API_KEY=your_admin_api_key
    ```

5. **Run the Project Locally:**

    ```bash
    node index.js
    ```

    The server will run locally at [http://localhost:3000](http://localhost:3000).

6. **Test the API Endpoints:**

    Use Postman or a similar tool to test the following routes:

    - **Register a User:** `POST /auth/register`
    - **Login a User:** `POST /auth/login`
    - **Admin Add Train (requires API Key):** `POST /admin/add_train`
    - **Get Train Availability:** `GET /trains`
    - **Book a Seat (requires JWT):** `POST /book_seat/:train_id`
    - **Get Booking Details (requires JWT):** `GET /booking/:user_id`

## Important Notes

- Ensure that PostgreSQL is running before starting the project.
- Protected routes for admin (e.g., adding trains) require the API key.
- JWT tokens are required for booking seats and fetching booking details.

## License

This project is licensed under the MIT License - see the [LICENSE](License) file for details.

## Contributing

Feel free to submit issues or pull requests to enhance the functionality or fix bugs.

## Contact

For any questions or issues, please reach out to [utkarshpatidar011@gmail.com](mailto:utkarshpatidar011@gmail.com).
