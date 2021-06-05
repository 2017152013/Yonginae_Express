var express = require('express');
const Challenge = require('../models/Challenge');
var router = express.Router();
const Review = require('../models/Review');

router.get('/', function(req, res){

    // 로그인 안 된 상태에서 mypage 접속 시 redirect
    if(req.session.is_logined == undefined){
        res.redirect("/account/login");
        return;
    }

    Review.count({writer:req.session.user}, (err, reviewCount) => {
        if(err){
            console.log(err);
        }else{

            Challenge.find()
                .populate({path:"review", match:{writer:req.session.user}})
                .exec((err, challs) => {
                    challs = challs.filter(function(chall){
                        return chall.review;
                    });
                    
                    res.render('mypage/mypage', {
                        title: "mypage",
                        css:"/css/main.css",
                        is_logined:req.session.is_logined,
                        user:req.session.user,
                        reviewCount:reviewCount,
                        challs:challs,
                        challCount:challs.length
                    });
                    return;
                })
        }
    });

    
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

router.get('/mychallenge', function(req, res){
    
    Challenge.find({isDeleted:false})
        .populate({path:"review", match:{writer:req.session.user}})
        .exec((err, challs) => {
            challs = challs.filter(function(chall){
                return chall.review;
            });
            res.render('mypage/mychallenge', {
                title: "mypage:mychallenge",
                css:"/css/main.css",
                is_logined:req.session.is_logined,
                user:req.session.user,
                challs:challs,
            });
            return;
        })
});

module.exports = router;
