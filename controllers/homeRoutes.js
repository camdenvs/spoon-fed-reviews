const router = require('express').Router();
const { Recipe, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//need get routes for all recipes, one recipe, user profile, login