const Recipe = require("../models/recipeModel");
const asyncHandler = require("express-async-handler");

const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ user: req.user._id });
  res.json(recipes);
});

const createRecipe = asyncHandler(async (req, res) => {
  const { title, ingredients, category } = req.body;

  if (!title || !ingredients || !category) {
    res.status(400);
    throw new Error("Please fill all the fields!");
  } else {
    const recipe = new Recipe({
      user: req.user._id,
      title,
      ingredients,
      category,
    });

    const createdRecipe = await recipe.save();

    res.status(201).json(createdRecipe);
  }
});

const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found! " });
  }
});

const UpdateRecipe = asyncHandler(async (req, res) => {
  const { title, ingredients, category } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  if (recipe.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }

  if (recipe) {
    recipe.title = title;
    recipe.ingredients = ingredients;
    recipe.category = category;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } else {
    res.status(404);
    throw new Error("Recipe not found!");
  }
});

const DeleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }

  if (recipe) {
    await recipe.remove();
    res.json({ message: "Recipe Removed!" });
  } else {
    res.status(404);
    throw new Error("Recipe not found!");
  }
});

module.exports = {
  getRecipes,
  createRecipe,
  getRecipeById,
  UpdateRecipe,
  DeleteRecipe,
};
