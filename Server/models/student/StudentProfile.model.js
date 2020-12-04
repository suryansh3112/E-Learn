const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
  image:{type: String , default:null},
  department : {type: String, required: true},
  name: { type: String, required: true },
  rollno:{ type: String, required: true },
  age:{type: String, required: true},
  mobile:{type: String, required: true},
  altmobile:{type: String, default:null}
  

});

module.exports = mongoose.model('StudentProfile', profileSchema);