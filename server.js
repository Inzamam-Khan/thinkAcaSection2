const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
// const db = require("./db"); // Assume this connects to a database

app.use(bodyParser.json());

// Secret for JWT token signing (should be stored securely, e.g., in environment variables)
const JWT_SECRET = "your_jwt_secret"; // Replace with a real secret or fetch from environment

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Use parameterized query to prevent SQL injection
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (user) {
            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                // Generate a secure JWT token upon successful authentication
                const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
                res.send({ token });
            } else {
                res.status(401).send("Unauthorized");
            }
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(8000, () => console.log("Server running on port 3000"));
