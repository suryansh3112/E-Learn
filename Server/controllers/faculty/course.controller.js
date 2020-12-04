const User = require('../../models/faculty/FacultyUser.model');
const Course = require('../../models/faculty/Course.model');

const addCourse = async (req,res)=>{
  try {
    const data = req.body;
    
    const user = await User.findById(req.user).populate('profile')

    data.cimg=user.profile.image
  const newCourse = new Course(data)
  const savedCourse = await newCourse.save()
  res.status(200).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
}

const addVideo = async(req,res)=>{
  try {
   const data = req.body;
   const course = await Course.findById(req.params.cid)

   course.videos.push(data);

   const updatedCourse = await course.save()

   res.status(200).json(updatedCourse)
  //res.status(200).json(course)


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAllCourse = async(req,res)=>{
  try {
    const all = await Course.find()
    res.status(200).json(all)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getCourse = async(req,res)=>{
  try {
    const course = await Course.findById(req.params.cid)
    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAllVideos = async (req,res)=>{
  try {
    const course = await Course.findById(req.params.cid)
    res.status(200).json(course.videos)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const addFile = async(req,res)=>{
  try {
   const data = req.body;
   const course = await Course.findById(req.params.cid)

   course.files.push(data);

   const updatedCourse = await course.save()

   res.status(200).json(updatedCourse)
  //res.status(200).json(course)


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.addCourse = addCourse;
exports.addVideo = addVideo;
exports.getAllCourse = getAllCourse;
exports.getCourse = getCourse;
exports.getAllVideos = getAllVideos;
exports.addFile = addFile;