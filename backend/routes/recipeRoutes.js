const express = require("express");
const {
  getRecipes,
  createRecipe,
  getRecipeById,
  UpdateRecipe,
  DeleteRecipe,
} = require("../controllers/recipeController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getRecipes);
router.route("/create").post(protect, createRecipe);
router
  .route("/:id")
  .get(getRecipeById)
  .put(protect, UpdateRecipe)
  .delete(protect, DeleteRecipe);

module.exports = router;
