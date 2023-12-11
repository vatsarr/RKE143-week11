const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    try {
        const ingredients = await db.query("SELECT * FROM ingredient;");
        res.json(ingredients.rows);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
    const { ingredientname } = req.body;
    console.log(ingredientname);

    const data = await db.query(
        "SELECT * FROM ingredient WHERE ingredientname = $1;",
        [ingredientname]
    );
    console.log(data.rows);

    if (data.rows.length !== 0) {
        res.json({ message: "Ingredient already exists." });
    } else {
        try {
            const result = await db.query(
                "INSERT INTO ingredient (ingredientname) VALUES ($1);",
                [ingredientname]
            );

            console.log(result.rowCount);
            res.status(200).json({
                message: `${result.rowCount} rows have been added.`,
            });
        } catch (error) {
            console.log(error);
        }
    }
});

router.delete("/", async (req, res) => {
    const { ingredientname } = req.body;

    const data = await db.query(
        "SELECT * FROM ingredient WHERE ingredientname = $1;",
        [ingredientname]
    );

    if (data.rows.length === 0) {
        res.json({ message: "There is no such ingredient!" });
    } else {
        try {
            const result = await db.query(
                "DELETE FROM ingredient WHERE ingredientname = $1;",
                [ingredientname]
            );
            res.status(200).json({
                message: `${result.rowCount} rows have been deleted.`,
            });
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = router;
