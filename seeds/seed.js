const sequelize = require('../config/connection');

const userData = require('./userData.json');
const seedRecipe = require("./recipeData.json");
const seedIngredient = require("./ingredientData.json");
const RecipeIngredient = require("./recipe-ingredient.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await seedRecipe();

  await seedIngredient(); 
  
  process.exit(0);
};

seedDatabase();
