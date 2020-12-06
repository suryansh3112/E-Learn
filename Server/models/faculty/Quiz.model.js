const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
  qname:{type:String,required:true},
  qno:{type:Number, required:true},
  qna:[{
    q:{type:String,required:true},
    a:{type:String,required:true},
    b:{type:String,required:true},
    c:{type:String,required:true},
    d:{type:String,required:true},
    ans:{type:String,required:true},
    check:String
  }],
  qdate:{type:Date,required:true},
  results:[{
    name:{type:String,required:true},
    rollno:{type:String,required:true},
    score:{type:String,required:true}
  }]

})

module.exports = mongoose.model('Quiz',quizSchema)