const express = require("express");
const recipeController = require("../controllers/recipeController");

const router = express.Router();

router.route("/getRecipeById/:id").get(recipeController.getRecipeById);
router.route("/:id").put(recipeController.updateRecipe);

router
	.route("/")
	.post(recipeController.addRecipeWithImage)
	.get(recipeController.getAllRecipes);

module.exports = router;
