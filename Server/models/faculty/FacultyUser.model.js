const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  profile:{type:mongoose.Schema.Types.ObjectId , ref:'FacultyProfile', default:null}
});

module.exports = mongoose.model('FacultyUser', facultySchema);
