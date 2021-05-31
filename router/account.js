const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('account/login',{
        title:"login",
        css:"css/main.css",
        model:User.User
    });
    return;
})

router.post('/login', (req, res) => {
    let result = {}
    console.log("로그인정보" + req.body.id);
    const id = req.body.id;
    const password = req.body.password;
    User.findOne({id:id, password:password}, function(err, data){
        if(!data){
            result.message = "존재하지 않는 회원 정보입니다.";
        }
        req.session.is_logined = true;
        req.session.user = id;
        res.json(result);
    });
})

router.get('/signup', function(req, res){
    res.render('account/signup', {
        title: "signup",
        css:"css/main.css",
        model:User.User
    });
    return;
})

router.post('/signup', function(req, res){
    const id = req.body.id;
    const password = req.body.password;
    const newUser = new User({id:id, password:password});
    let result = {}
    newUser.save(function(err, data){
        if(err){
            console.log(err);
        }else{
            result["message"] = "회원가입이 완료되었습니다.";
            req.session.is_logined = true;
            req.session.user = id;
        }
        res.json(result);
    });
})

router.post("/idcheck", function(req, res){
    const input_id = req.body.id
    User.find({"id":input_id}, function(err, data){
        let result = {}; 
        if(data.length <= 0){
            result["duplicate"] = 0;
            result["message"] = "사용할 수 있는 아이디입니다.";
        }
        else{
            result["duplicate"] = 1;
            result["message"] = "중복된 아이디가 존재합니다.";
        } 
        
        res.json(result);
    })
})

router.get('/logout', function(req, res){
    req.session.destroy(function(err){
        console.log(err);
    });
    res.redirect('/');
})

module.exports = router;