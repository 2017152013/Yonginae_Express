const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

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
const ReviewSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    filename:{
        type:String,
    },
    place_name:{
        type:String,
    },
    place_id:{
        type:String,
    },
    yongi_type:{
        type:String,
        required:true
    }
    ,
    yongi_volume:{
        type:String,
        required:true
    },
    yongi_rating:{
        type:Number,
        required:true
    },
    writer:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    }
})

var Review = mongoose.model('ReviewSchema', ReviewSchema);
module.exports = Review;