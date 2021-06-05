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
const ChallengeSchema = new mongoose.Schema({

    review:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ReviewSchema'
    },
    claps:{
        type:Number,
        default:0
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
    
})

var Challenge = mongoose.model('ChallengeSchema', ChallengeSchema);
module.exports = Challenge;