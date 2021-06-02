var express = require('express');
var router = express.Router();
const Review = require('../models/Review');

router.get('/', function(req, res){

    // 로그인 안 된 상태에서 mypage 접속 시 redirect
    if(req.session.is_logined == undefined){
        res.redirect("/account/login");
        return;
    }

    res.render('mypage/mypage', {
        title: "mypage",
        css:"/css/main.css",
        is_logined:req.session.is_logined,
        user:req.session.user
    });
    return;
});

router.get('/myreview', function(req, res){
    let reviews = {};
    Review.find({writer:req.session.user}, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            for(let i = 1; i <= data.length; i ++){
                reviews[i] = data[i];
            }
        }
    }).then((reviews) => {
        res.render('mypage/myreview', {
            title: "mypage:myreview",
            css:"/css/main.css",
            is_logined:req.session.is_logined,
            user:req.session.user,
            reviews:reviews
        });
    })
    return;
})

module.exports = router;
