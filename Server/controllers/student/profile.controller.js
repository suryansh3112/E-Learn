const StudentProfile = require('../../models/student/StudentProfile.model');
const User = require('../../models/student/StudentUser.model');

const addProfile = async(req,res)=>{
  try {
    
    const data = req.body;

    const updateUser = await User.findOne({_id:req.user})

    const createProfile = new StudentProfile(data)
    const newProfile = await createProfile.save()

    updateUser.profile = newProfile._id;

    const savedUser =await updateUser.save()
    res.status(200).json(savedUser)


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const editProfile = async(req,res)=>{
  try {
    const user = await User.findOne({_id:req.user})
    const edit = await StudentProfile.findByIdAndUpdate(user.profile, {$set : req.body })
    res.status(200).json(edit)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getProfile = async(req,res)=>{
  try {
    const user = await User.findOne({_id:req.user})
    if(user.profile){

      const profile = await StudentProfile.findOne(user.profile)

      res.status(200).json(profile)
    }
    else{
      res.status(200).json(false)
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//========================EXPORTS===============================
exports.addProfile = addProfile;
exports.editProfile = editProfile;
exports.getProfile = getProfile;