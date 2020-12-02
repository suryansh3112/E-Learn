const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
  image:{type: String , default:null},
  regno:{type:Number, required: true},
  q1:{type: String, required: true},
  q2: {type: String, required: true},
  department : {type: String, required: true},
  name: { type: String, required: true },
});

module.exports = mongoose.model('FacultyProfile', profileSchema);