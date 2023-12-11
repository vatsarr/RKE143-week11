const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    try {
        const recipes = await db.query("SELECT * FROM recipe;");
        res.json(recipes.rows);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
    const { recipename } = req.body;
    console.log(recipename);

    const data = await db.query("SELECT * FROM recipe where recipename = $1;", [
        recipename,
    ]);
    console.log(data.rows);

    if (data.rows.length !== 0) {
        res.json({ message: "recipe already exists" });
    } else {
        try {
            const result = await db.query(
                "INSERT INTO recipe (recipename) VALUES ($1);",
                [recipename]
            );

            console.log(result.rowCount);
            res.status(200).json({
                message: `${result.rowCount} rows have been added.`,
            });
        } catch (error) {}
    }
});

module.exports = router;
