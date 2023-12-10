CREATE DATABASE myrecipes;

CREATE TABLE
    recipe (id SERIAL PRIMARY KEY, recipeName VARCHAR(55));

INSERT INTO
    recipe (recipeName)
VALUES
    ('Pumpkin Pasties'),
    ('Pumpkin Tartlets'),
    ('Creamy Pumpkin Soup');

CREATE TABLE
    ingredient (id SERIAL PRIMARY KEY, ingredientName VARCHAR(55));

INSERT INTO
    ingredient (ingredientName)
VALUES
    ('pumpkin puree'),
    ('sugar'),
    ('cinnamon'),
    ('nutmeg'),
    ('cloves'),
    ('Pastry dough'),
    ('Egg wash (1 egg beaten with a splash of milk)'),
    ('brown sugar'),
    ('ginger'),
    ('Mini tart shells'),
    ('Whipped cream for garnish'),
    ('onion, chopped'),
    ('garlic, minced'),
    ('vegetable broth'),
    ('heavy cream'),
    ('Salt and pepper to taste');

CREATE TABLE
    ingredientInRecipe (
        id SERIAL PRIMARY KEY,
        recipeId INTEGER,
        ingredientId INTEGER,
        FOREIGN KEY (recipeId) REFERENCES recipe (id),
        FOREIGN KEY (ingredientId) REFERENCES ingredient (id)
    );

INSERT INTO
    ingredientInRecipe (recipeId, ingredientId)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (2, 1),
    (2, 8),
    (2, 9),
    (2, 3),
    (2, 4),
    (2, 10),
    (2, 11),
    (3, 1),
    (3, 12),
    (3, 5),
    (3, 14),
    (3, 15),
    (3, 16);

ALTER TABLE recipe
ADD COLUMN instructions text;

UPDATE recipe
SET
    instructions = '<br>Mix pumpkin puree, sugar, and spices in a bowl.
    <br>Roll out the pastry dough and cut it into small circles.
    <br>Fold the dough over to create a half-moon shape and crimp the edges with a fork.
    <br>Brush the pasties with egg wash.
    <br>Bake at 375°F (190°C) for 20-25 minutes or until golden brown.'
WHERE
    id = 1;

UPDATE recipe
SET
    instructions = '<br>Mix pumpkin puree, brown sugar, and spices in a bowl.
    <br>Spoon the mixture into mini tart shells.
    <br>Bake at 350°F (175°C) for 15-20 minutes or until set.
    <br>Let cool and garnish with whipped cream.'
WHERE
    id = 2;

UPDATE recipe
SET
    instructions = '<br>Sauté the onion and garlic in a pot until soft.
    <br>Add the pumpkin puree and vegetable broth, and simmer for 20 minutes.
    <br>Blend the soup until smooth, then return it to the pot.
    <br>Blend the soup until smooth, then return it to the pot.
    <br>Blend the soup until smooth, then return it to the pot.
    <br>Stir in the heavy cream and season with salt and pepper.
    <br>Heat through and serve.'
WHERE
    id = 3;

INSERT INTO
    ingredientInRecipe (recipeId, ingredientId)
SELECT
    a.id,
    b.id
FROM
    recipe a
    JOIN ingredient b ON a.recipeName = 'Pumpkin Pasties'
    AND b.ingredientName = 'cloves';

SELECT
    a.recipeName,
    b.ingredientName
FROM
    recipe a
    INNER JOIN ingredientInRecipe c ON a.id = c.recipeId
    INNER JOIN ingredient b ON b.id = c.ingredientId;

SELECT
    a.recipeName,
    a.instructions,
    b.ingredientName
FROM
    recipe a
    INNER JOIN IngredientInRecipe c ON a.id = c.recipeId
    INNER JOIN ingredient b ON b.id = c.ingredientId
WHERE
    a.recipeName = 'Pumpkin Tartlets';

SELECT
    *
FROM
    recipe;

SELECT
    *
FROM
    ingredient;