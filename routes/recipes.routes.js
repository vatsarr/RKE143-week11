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
        res.json({ message: "Recipe already exists." });
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

router.put("/", async (req, res) => {
    const { recipename, instructions } = req.body;
    console.log(recipename);
    console.log(instructions);

    const data = await db.query("SELECT * FROM recipe where recipename = $1;", [
        recipename,
    ]);

    if (data.rows.length === 0) {
        res.json({ message: "There is no such recipe!" });
    } else {
        try {
            const result = await db.query(
                "UPDATE recipe SET instructions = $1 WHERE recipename = $2;",
                [instructions, recipename]
            );
            res.status(200).json({
                message: `${result.rowCount} rows have been updated.`,
            });
        } catch (error) {
            console.log(error);
        }
    }
});

router.delete("/", async (req, res) => {
    const { recipename } = req.body;

    const data = await db.query("SELECT * FROM recipe where recipename = $1;", [
        recipename,
    ]);

    if (data.rows.length === 0) {
        res.json({ message: "There is no such recipe!" });
    } else {
        try {
            const result = await db.query(
                "DELETE FROM recipe WHERE recipename = $1;",
                [recipename]
            );
            res.status(200).json({
                message: `${result.rowCount} rows have been deleted.`,
            });
        } catch (error) {
            console.log(error);
        }
    }
});

router.post("/addingredientinrecipe", async (req, res) => {
    const { recipename, ingredientname } = req.body;

    const data = await db.query(
        "SELECT a.recipeName, b.ingredientName FROM recipe a INNER JOIN ingredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId WHERE a.recipeName = $1 AND b.ingredientName = $2;",
        [recipename, ingredientname]
    );

    if (data.rows.length !== 0) {
        res.json({ message: "Record already exists." });
    } else {
        try {
            const result = await db.query(
                "INSERT INTO ingredientInRecipe (recipeid, ingredientid) SELECT a.id, b.id FROM recipe a JOIN ingredient b ON a.recipeName = $1 AND b.ingredientname = $2;",
                [recipename, ingredientname]
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

module.exports = router;
