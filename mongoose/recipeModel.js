const mongoose = require("mongoose");


const recipeSchema = mongoose.Schema({
	id: {
		type: Number,
		required: false,
	},
	recipeName: {
		type: String,
		required: [true, "Must have a Name"],
		
	},
	img: {
		type: String,
		required: false,
	},
	description: {
		type: String,
	},
	author: {
		type: String,
	},
	ingredients: [
		{
			type: {
				amount: {
					type: Number,
					required: false,
				},
				ing: {
					type: String,
					required: false,
				},
			},
			required: false,
		},
	],
	method: {
		type: [String],
		required: false,
	},
	category: {
		type: String,
	},
	description: {
		type: String,
	},
});

const recipeModel = mongoose.model("Recipe", recipeSchema); 

module.exports = recipeModel;
