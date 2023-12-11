const express = require("express");
const bodyParser = require("body-parser");
const recipesRouter = require("./routes/recipes.routes.js");
const ingredientsRouter = require("./routes/ingredients.routes.js");
const fullRecipesRouter = require("./routes/fullRecipes.routes.js");
const randomRouter = require("./routes/randomRecipe.routes.js");
const usersRouter = require("./routes/users.routes.js");
const db = require("./db");

const port = 3000;

db.connect((error) => {
    if (error) {
        console.log("DB connection failed!");
    } else {
        console.log("DB connection initiated!");
    }
});

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/fullRecipes", fullRecipesRouter);
app.use("/random", randomRouter);
app.use("/users", usersRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
