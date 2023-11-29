const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  dishName: String,
  dishDescription: String,
  dishIngredients: String,
  dishRecipe: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);
