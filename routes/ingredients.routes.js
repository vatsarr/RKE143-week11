const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    const ingredients = await db.query("SELECT * FROM ingredient;");
    res.json(ingredients.rows);
});

module.exports = router;
