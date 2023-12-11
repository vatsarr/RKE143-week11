const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const verifyToken = require("../utilities/verification");

router.get("/secret", verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            res.status(202).json({
                userSecret: "Saladus",
                access: "Acess granted",
                authData: authData,
            });
        }
    });
});

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const data = await db.query("SELECT * FROM users WHERE username = $1", [
        username,
    ]);

    if (data.rows.length !== 0) {
        res.status(400).json({ error: "Username already in use" });
    } else {
        bcrypt.hash(password, 10, (error, hash) => {
            if (error) {
                res.status(error).json({
                    error: "Server error",
                });
            }
            const user = {
                username: username,
                password: hash,
            };

            try {
                db.query(
                    "INSERT INTO users (username, password) VALUES ($1, $2)",
                    [user.username, user.password]
                );
                res.status(201).json({
                    message: `New user ${user.username} registered!`,
                });
            } catch (error) {
                res.status(500).json({ error: "Database error" });
            }
        });
    }
});

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const data = await db.query("SELECT * FROM users WHERE username = $1", [
            username,
        ]);
        const user = data.rows;

        if (user.length === 0) {
            res.status(204).json({
                error: "Username not found. Please sign up.",
            });
        } else {
            bcrypt.compare(password, user[0].password, (error, result) => {
                if (error) {
                    res.status(500).json({ error: "Server error" });
                } else if (result) {
                    const myUser = {
                        username: username,
                    };

                    jwt.sign(
                        { user: myUser },
                        process.env.SECRET_KEY,
                        (error, token) => {
                            if (error) {
                                res.send(500).json({ error: "Token failed" });
                            } else {
                                res.status(202).json({
                                    message: "User signed in",
                                    token: token,
                                });
                            }
                        }
                    );
                } else {
                    res.status(401).json({ error: "Sign in failed" });
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
