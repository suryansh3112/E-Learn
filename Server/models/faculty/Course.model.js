const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  cname:{type:String, required:true},
  cprof:{type:String, required:true},
  cimg:{type:String,default:"" },
  cdesc:{type:String ,required:true},
  videos:[{
    vname:{type:String, required:true},
    video:{type:String, required:true},
    vno:{type:Number, required:true}
  }],
  files:[{
    fname:{type:String, required:true},
    fpath:{type:String, required:true},
    fno:{type:Number, required:true}
  }],
  quizs:[{type:mongoose.Schema.Types.ObjectId , ref:'Quiz'}]
});

module.exports = mongoose.model('Course', courseSchema);
