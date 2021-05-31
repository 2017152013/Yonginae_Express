var express = require('express');
var router = express.Router();
const Review = require('../models/Review');


router.get('/', function(req, res){
    let reviews = {};
    Review.find({}, (err, data) => {
        for(let i = 1; i <= data.length; i ++){
            reviews[i] = data[i];
        }
    }).then((reviews) => {
        res.render('review/review', {
            title: "review",
            css:"css/main.css",
            is_logined:req.session.is_logined,
            user:req.session.user,
            reviews: reviews
        });
    })
    return;
})


router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    let review;
    Review.findOne({_id:id}, (err, data) => {
        if(err){
            console.log(err);
        }else{
            if (data == null){
                console.log("데이터가 없습니다");
            }
            else{
                review = data;
                res.render('review/detail', {
                    title: "detail",
                    css:"/css/main.css",
                    is_logined:req.session.is_logined,
                    user:req.session.user,
                    review: review
                });
            }
        }
        return;
    })
});

router.get('/create', (req, res) => {
    if (!req.session.is_logined){
        res.redirect('/account/login');
        return;
    }
    res.render('review/create',{
        title: "review:create",
        css:"/css/main.css",
        is_logined:req.session.is_logined,
        user:req.session.user
    });
    return;
})

router.post('/create', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const yongi_type = req.body.yongi_type;
    const yongi_volume = req.body.yongi_volume;
    const yongi_rating = req.body.yongi_rating;
    const writer = req.session.user;

    let newReview = new Review();
    newReview.title = title;
    newReview.content = content;
    newReview.yongi_type = yongi_type;
    newReview.yongi_volume = yongi_volume;
    newReview.yongi_rating = yongi_rating;
    newReview.writer = writer;

    let result = {};

    newReview.save((err, data) => {
        if(err){
            console.log(err);
        }
        else{
            result.success = 1;
            res.json(result);
        }
    });

})

module.exports = router;