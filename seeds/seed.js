const sequelize = require('../config/connection');

const userData = require('./userData.json');
const seedRecipe = require("./recipeData.json");
const seedIngredient = require("./ingredientData.json");
const recipeIngredient = require("./recipe-ingredients.json");

const { User, Recipe, Ingredient, RecipeIngredient } = require('../models')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const recipe of seedRecipe) {
    Recipe.create({
      ...recipe,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  Ingredient.bulkCreate(seedIngredient, {
    individualHooks: true,
    returning: true
  })
  
  RecipeIngredient.bulkCreate({
    individualHooks: true,
    returning: true,
  })

  process.exit(0);
};

seedDatabase();
