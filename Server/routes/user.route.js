const router = require('express').Router();
const userControllers = require('../controllers/user.controller');
const auth = require('../middleware/auth');

//registers a new User
router.post('/register', userControllers.register);

//Handle Login
router.post('/login', userControllers.login);

//testing jwt
router.post('/testJWT', auth, async (req, res) => {
  res.json(req.user);
});

//Checks for a valid token and returns a boolean
router.post('/tokenIsValid', userControllers.tokenIsValid);

//Gets currently logged in user
router.get('/', auth, userControllers.getLoggedInUser);

module.exports = router;
