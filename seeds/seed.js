const sequelize = require('../config/connection');

const userData = require('./userData.json');
const seedRecipe = require("./recipeData.json");

const { User, Recipe } = require('../models')

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

  process.exit(0);
};

seedDatabase();
