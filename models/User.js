const mongoose = require("mongoose");

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
const UserSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    }
})


var User = mongoose.model('Schema', UserSchema);
module.exports = User;