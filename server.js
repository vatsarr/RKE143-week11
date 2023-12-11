const express = require("express");
const recipesRouter = require("./routes/recipes.routes.js");
const ingredientsRouter = require("./routes/ingredients.routes.js");
const fullRecipesRouter = require("./routes/fullRecipes.routes.js");
const randomRouter = require("./routes/randomRecipe.routes.js");

const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
    res.render("index");
});

app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/fullRecipes", fullRecipesRouter);
app.use("/random", randomRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
