const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    try {
        const recipeQuery =
            "SELECT id, recipeName, instructions, imageURL FROM recipe ORDER BY RANDOM() LIMIT 1;";

        const recipeResult = await db.query(recipeQuery);
        const selectedRecipe = recipeResult.rows[0];

        const ingredientsQuery =
            "SELECT b.ingredientName FROM ingredient b INNER JOIN IngredientInRecipe c ON b.id = c.ingredientId WHERE c.recipeId = $1;";

        const ingredientsResult = await db.query(ingredientsQuery, [
            selectedRecipe.id,
        ]);

        const ingredients = ingredientsResult.rows.map(
            (element) => element.ingredientname
        );

        const randomRecipe = {
            recipe: selectedRecipe,
            ingredients: ingredients,
        };

        res.json(randomRecipe);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

try {
} catch (error) {
    res.status(500).json({ error: "Internal server error" });
}
