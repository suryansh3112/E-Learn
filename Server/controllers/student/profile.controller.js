const StudentProfile = require('../../models/student/StudentProfile.model');
const User = require('../../models/student/StudentUser.model');

const addProfile = async(req,res)=>{
  try {
    const {department}=req.body;

    if(!department)
      return res
      .status(400)
      .json({ message: 'Not all fields have been entered.' });


      const updateUser = await User.findOne({_id:req.user})

      const name=updateUser.name;
      const rollno=updateUser.username;

    const createProfile = new StudentProfile({department,name,rollno})
    const newProfile = await createProfile.save()

    
    updateUser.profile = newProfile._id;

    const savedUser = updateUser.save()
    res.status(200).json(savedUser)


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//========================EXPORTS===============================
exports.addProfile = addProfile;