var express = require('express');
var router = express.Router();
var Review = require('../models/Review');

router.get('/', function(req, res){
    res.render('place/place', {
        title: "place",
        css:"/css/main.css",
        is_logined:req.session.is_logined,
        user:req.session.user
    });
    return;
})

router.get('/place_review/:id/:place_name', function(req, res){
    const id = req.params.id;
    const place_name = req.params.place_name;

    let reviews = {};
    Review.find({place_id : id}, (err, data) => {
        if(err){
            console.log(err);
        }else{
            for(let i = 0; i < data.length; i ++){
                reviews[i] = data[i];
            }
            return reviews;
        }
    }).then((reviews) => {
        res.render('place/place_review', {
            title: "place:review",
            css: "/css/main.css",
            is_logined: req.session.is_logined,
            user: req.session.user,
            reviews:reviews,
            id:id,
            place_name:place_name
        });
    })
    
});

router.get('/place_create/:id/:place_name', function(req, res){
    const id = req.params.id;
    const place_name = req.params.place_name;

    res.render('place/place_create', {
        title: "place:createreview",
        css: "/css/main.css",
        is_logined: req.session.is_logined,
        user: req.session.user,
        id:id,
        place_name:place_name
    });
    
})

module.exports = router;