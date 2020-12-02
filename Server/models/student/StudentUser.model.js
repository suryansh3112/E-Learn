const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username:{type: String, required: true, unique: true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  profile:{type:mongoose.Schema.Types.ObjectId , ref:'StudentProfile', default:null}
});

module.exports = mongoose.model('StudentUser', studentSchema);
