const Recipe = require("../../mongoose/recipeModel");
const Ongredients = require("../../mongoose/recipeModel");


exports.addRecipeWithImage = async (req, res) => {
	console.log(req.body);

	try {
		const {
			id,
			recipeName,
			description,
			author,
			ingredients,
			method,
			category,
			img,
		} = req.body;

		let imgPath = null;

		if (req.file) {
			imgPath = req.file.path;
		}

		const newRecipe = await Recipe.create({
			id,
			recipeName,
			description,
			author,
			ingredients,
			method,
			category,
			img: imgPath,
		});

		res.status(201).json({
			status: "success",
			data: {
				recipe: newRecipe,
			},
		});
	} catch (err) {
		console.error("Error:", err);

		if (req.file) {
			fs.unlinkSync(req.file.path);
		}

		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.getAllRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find();

		res.status(200).json({
			status: "success",
			data: {
				recipes,
			},
		});
	} catch (err) {
		console.error("Error:", err);
		res.status(500).json({
			status: "error",
			message: "Internal server error",
		});
	}
};

exports.getRecipeById = async (req, res) => {
	try {
		const id = req.params.id;
		console.log(id);
		const recipe = await Recipe.find({ id: id });

		if (!recipe) {
			return res.status(404).json({
				status: "fail",
				message: "Recipe not found",
			});
		}

		res.status(200).json({
			status: "success",
			data: {
				recipe,
			},
		});
	} catch (err) {
		console.error("Error:", err);
		res.status(500).json({
			status: "error",
			message: "Internal server error",
		});
	}
};
exports.updateRecipe = async (req, res) => {
	try {
		const { id } = req.params; 
		const updatedData = req.body; 
		const editedRecipe = {};

		const existingRecipe = await Recipe.findOne({ id: id });

		if (!existingRecipe) {
			return res.status(404).json({
				status: "fail",
				message: "Recipe not found",
			});
		}

		editedRecipe.recipeName = updatedData.recipeName;
		editedRecipe.img = updatedData.img;
		editedRecipe.description = updatedData.description;
		editedRecipe.author = updatedData.author;
		editedRecipe.ingredients = updatedData.ingredients.map(ingredient => {
            const { _id, ...rest } = ingredient;
            return rest;
        });		
		editedRecipe.method = updatedData.method;
	

		const edetedRecipe = await Recipe.findByIdAndUpdate(
			existingRecipe._id,
			editedRecipe,
		);
		res.status(200).json({
			status: "success",
			data: {
				recipe: edetedRecipe,
			},
		});
	} catch (err) {
		console.error("Error:", err);
		res.status(500).json({
			status: "error",
			message: "Internal server error",
		});
	}
};
