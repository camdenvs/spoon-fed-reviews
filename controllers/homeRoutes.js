const router = require('express').Router();
const { Recipe, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//need get routes for all recipes, one recipe, user profile, login
router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const recipeData = await Recipe.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
        });

        // Serialize data so the template can read it
        const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            recipes,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/recipe/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
        });

        const recipe = recipeData.get({ plain: true });

        res.render('recipe', {
            ...recipe,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Recipe }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newrecipe', withAuth, async (req, res) => {
    try {
        res.render('newrecipe', {
            logged_in: true
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});


router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('reviews', {
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
