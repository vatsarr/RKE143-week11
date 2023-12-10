const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    try {
        const recipes = await db.query(
            "SELECT a.recipeName, a.instructions, b.ingredientName FROM recipe a INNER JOIN IngredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId;"
        );

        const recipeMap = {};

        for (const item of recipes.rows) {
            const { recipename, instructions, ingredientname } = item;

            if (!recipeMap[recipename]) {
                recipeMap[recipename] = {
                    recipename: recipename,
                    instructions: instructions,
                    ingredients: [],
                };
            }

            recipeMap[recipename].ingredients.push(ingredientname);
        }

        const resultArray = Object.values(recipeMap);
        res.json(resultArray);

        //console.log(recipes.rows);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/recipeingredients", async (req, res) => {
    try {
        const recipes = await db.query(
            "SELECT a.recipeName, b.ingredientName FROM recipe a INNER JOIN IngredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId;"
        );

        const recipeMap = {};

        for (const item of recipes.rows) {
            const { recipename, ingredientname } = item;

            if (!recipeMap[recipename]) {
                recipeMap[recipename] = [];
            }

            recipeMap[recipename].push(ingredientname);
        }

        res.json(recipeMap);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/search", async (req, res) => {
    try {
        const searchString = req.query.recipeName;
        const recipe = await db.query(
            "SELECT a.recipeName, a.instructions, b.ingredientName FROM recipe a INNER JOIN IngredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId WHERE a.recipeName = $1",
            [searchString]
        );

        const recipeMap = {};

        for (const item of recipe.rows) {
            const { recipename, instructions, ingredientname } = item;

            if (!recipeMap[recipename]) {
                recipeMap[recipename] = {
                    recipename: recipename,
                    instructions: instructions,
                    ingredients: [],
                };
            }

            recipeMap[recipename].ingredients.push(ingredientname);
        }

        const resultArray = Object.values(recipeMap);
        res.json(resultArray);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
