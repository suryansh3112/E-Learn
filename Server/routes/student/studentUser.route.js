const router = require('express').Router();
const userControllers = require('../../controllers/student/student.controller');
const profileControllers = require('../../controllers/student/profile.controller');
const auth = require('../../middleware/auth');

//registers a new User
router.post('/register',userControllers.register);

//Handle Login
router.post('/login', userControllers.login);

//Checks for a valid token and returns a boolean
router.post('/tokenIsValid', userControllers.tokenIsValid);

//Gets currently logged in user
router.get('/', auth, userControllers.getLoggedInUser);

//==============================PROFILE==========================


//Adds profile
router.post('/profile/add', auth, profileControllers.addProfile);

module.exports = router;