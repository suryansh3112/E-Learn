const FacultyProfile = require('../../models/faculty/FacultyProfile.model')
const User = require('../../models/faculty/FacultyUser.model')

const addProfile = async(req,res)=>{

  try{

    const {regno, q1, q2, department, image}=req.body;

    if(!image)
      image='';

    if(!regno || !department ||!q1 ||!q2)
      return res
      .status(400)
      .json({ message: 'Not all fields have been entered.' });

    

      const updateUser = await User.findOne({_id:req.user})

      const name = updateUser.name;
      
    const createProfile = new FacultyProfile({
      regno,
      q1,
      q2,
      department,
      name,
      image
    })

    const newProfile = await createProfile.save()
    
    updateUser.profile = newProfile._id;

    const savedUser = await updateUser.save()
    res.status(200).json(savedUser)


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const editProfile = async(req,res)=>{
  try {
    const user = await User.findOne({_id:req.user})
    const edit = await FacultyProfile.findByIdAndUpdate(user.profile, {$set : req.body })
    res.status(200).json(edit)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getProfile = async(req,res)=>{
  try {
    const user = await User.findOne({_id:req.user})
    if(user.profile){
      const profile = await FacultyProfile.findById(user.profile);
      res.status(200).json(profile);
    }
    else{
      res.status(200).json(false);
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//========================EXPORTS===============================
exports.addProfile = addProfile;
exports.editProfile = editProfile;
exports.getProfile = getProfile;