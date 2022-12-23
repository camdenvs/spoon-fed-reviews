const sequelize = require('../config/connection');

const userData = require('./userData.json');
const seedRecipe = require("./recipeData.json");
const seedIngredient = require("./ingredientData.json");
const recipeIngredient = require("./recipe-ingredients.json");

const { User, Recipe, Ingredient, RecipeIngredient } = require('../models')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const recipe of seedRecipe) {
    await Recipe.create({
      ...recipe,
      user_id: 1,
    })
  }

  await Ingredient.bulkCreate(seedIngredient, {
  })
  
  await RecipeIngredient.bulkCreate({recipeIngredient
  })

  process.exit(0);
};

seedDatabase();
