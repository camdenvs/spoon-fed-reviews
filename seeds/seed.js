const sequelize = require('../config/connection');

const userData = require('./userData.json');
const seedRecipe = require("./recipeData.json");

// const config = require("../config/config.json5");

const { User, Recipe } = require('../models')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // const json5Recipe = json5.parse(seedRecipe);
  for (const recipe of seedRecipe) {
    await Recipe.create({
      ...recipe,
      user_id: 1,
    })
  }

  process.exit(0);
};

seedDatabase();
