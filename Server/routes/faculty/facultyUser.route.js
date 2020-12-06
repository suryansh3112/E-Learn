const router = require('express').Router();
const userControllers = require('../../controllers/faculty/faculty.controller');
const profileControllers = require('../../controllers/faculty/profile.controller');
const courseControllers = require('../../controllers/faculty/course.controller');
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
router.post('/profile', auth, profileControllers.addProfile);

//Edits Profile
router.patch('/profile', auth, profileControllers.editProfile);

//Get Profile
router.get('/profile', auth, profileControllers.getProfile);

//==============================COURSE==========================

// Add a course
router.post('/course/add',auth,courseControllers.addCourse)

//Add a course video
router.post('/course/add-video/:cid',auth,courseControllers.addVideo)

//Add a course file
router.post('/course/add-file/:cid',auth,courseControllers.addFile)

//Add quiz
router.post('/course/add-quiz/:cid',auth,courseControllers.addQuiz)

//Get quiz
router.get('/course/get-quiz/:qid',auth,courseControllers.getQuiz)

//Submit quiz
router.post('/course/submit-quiz/:qid',auth,courseControllers.submitQuiz)

//Get all Courses
router.get('/course/all',auth,courseControllers.getAllCourse)

//Get specific course
router.get('/course/:cid',auth,courseControllers.getCourse)

//Get all videos of specific course
router.get('/course/:cid/videos',auth,courseControllers.getAllVideos)

module.exports = router;