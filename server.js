const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");


app.use(bodyParser.json());


const JWT_SECRET = "yourJwtSecret"; 

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (user) {
        
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
        
                const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
                res.send({ token });
            } else {
                res.status(401).send("Unauthorized");
            }
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(8000, () => console.log("Server started  on port 8000"));
