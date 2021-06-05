var express = require('express');
var router = express.Router();
const Review = require('../models/Review');
const Challenge = require('../models/Challenge');

router.get('/', function(req, res){

    let challenges = {};
    
    Challenge.find({isDeleted:false})
        .populate("review")
        .exec((err, challs) => {
            if(err) return res.status(400).send(err);
            res.render('challenge/challenge', {
                title: "challenge",
                css: "/css/main.css",
                is_logined: req.session.is_logined,
                user: req.session.user,
                challs: challs
            });
        });
});

router.get('/review_select', (req, res) => {
    if (!req.session.is_logined) {
        res.redirect('/account/login');
        return;
    }
    
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
        res.render('challenge/review_select', {
            title: "challenge: review_select",
            css:"/css/main.css",
            is_logined:req.session.is_logined,
            user:req.session.user,
            reviews:reviews
        });
    })
    return;
});

router.post('/read', (req, res) => {
    const id = req.body.id;

    let result = {};
    
    Review.findOne({
        _id: id
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            result.id = id;
            result.title = data.title;
            result.content = data.content;
            result.filename = data.filename;
            res.json(result);
        }
    })
});


router.post('/register_challenge', (req, res) => {
    const id = req.body.id;
    
    let review;

    Review.findOne({_id:id}, (err, data) => {
        if(err){
            console.log(err);
            return;
        }else{
            review = data;
            return review;
        }
    }).then((review) => {
        let newChallenge = new Challenge({review: review});
        return newChallenge;
    }).then((newChallenge) => {
        newChallenge.save();
        let result = {};
        result.message = "챌린지에 참여하셨습니다!";
        res.json(result);
    })
});

router.get('/clap/:id', (req, res) => {
    const id = req.params.id;
    Challenge.findOneAndUpdate(
        {_id: id}, 
        { $inc : {'claps' : 1}},
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log("doc");
                console.log(doc);
                req.session.save(() => {
                    res.redirect('/challenge');
                })
                return;
            }
        }
    );
});

module.exports = router;
