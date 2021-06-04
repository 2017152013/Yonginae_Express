const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Challenge = require('./Challenge');

// mongoose setting
mongoose.connect('mongodb://localhost:27017/yonginaeDB', {useNewUrlParser:true});
var db = mongoose.connection;
db.on('error',function(){
    console.log('Connection falied');
})
db.once('open', function(){
    console.log('connected!');
})

// Schema 생성
// 용기, 용기 평가, 이미지, 제목, 내용, 작성자, 작성일
const CommentSchema = new mongoose.Schema({

    review_id:{
        type:String,
        required:true
    },
    writer:{
        type:String
    },
    content:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

var Comment = mongoose.model('CommentSchema', CommentSchema);
module.exports = Comment;