var express = require('express');
var router = express.Router();
const Review = require('../models/Review');
const multer = require('multer');

// 업로드 파일 위치 지정
//var upload = multer({dest:'uploads/'});
const storage = multer.diskStorage({
    destination:(req, file, callback) => {
        callback(null, "uploads/");
    },
    filename:(req, file, callback) => {
        callback(null, file.originalname);
    }
});
const uploader = multer({storage:storage});


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

router.get('/edit/:id', (req, res) => {
    if (!req.session.is_logined){
        res.redirect('/account/login');
        return;
    }

    const id = req.params.id;
    Review.findOne({_id:id}, (err, data) => {
        if(err){
            console.log(err);
        }else{
            if (data == null){
                console.log("데이터가 없습니다");
            }
            else{
                review = data;
                res.render('review/edit',{
                    title: "review:edit",
                    css:"/css/main.css",
                    is_logined:req.session.is_logined,
                    user:req.session.user,
                    review:review
                });
            }
        }
        return;
    })
})


router.post('/create', uploader.single('file'), (req, res) => {
    let file = req.file;
  
    const title = req.body.title;
    const content = req.body.content;
    let filename;
    if(file == undefined){
        filename = "yonginae_default.JPG";
    }else{
        filename = file.filename;
    }
    const place_name = req.body.place_name;
    const place_id = req.body.place_id;
    let yongi_type = req.body.yongi_type;
    let yongi_volume = req.body.yongi_volume;
    const yongi_rating = req.body.yongi_rating;
    const writer = req.session.user;

    // 값 변경
    if(yongi_type == "square"){
        yongi_type = "사각 용기";
    }else if(yongi_type == "cyliner"){
        yongi_type = "원형 용기";
    }else if(yongi_type == "fryingpan"){
        yongi_type = "프라이팬";
    }else if(yongi_type == "pot"){
        yongi_type = "냄비";
    }else if(yongi_type == "tumbler"){
        yongi_type = "텀블러";
    }else{
        yongi_type = "기타";
    }
    
    // 값 변경
    if(yongi_volume == "500"){
        yongi_volume = "500ml 이하";
    }else if(yongi_volume == "1000"){
        yongi_volume = "1l 이하";
    }else if(yongi_volume == "1500"){
        yongi_volume = "1.5l 이하";
    }else if(yongi_volume == "2000"){
        yongi_volume = "2l 이하";
    }else if(yongi_volume == "2500"){
        yongi_volume = "2.5l 이하";
    }else if(yongi_volume == "3000"){
        yongi_volume = "3l 이하";
    }else if(yongi_volume == "3500"){
        yongi_volume = "3.5l 이하";
    }else if(yongi_volume == "4000"){
        yongi_volume = "4l 이하";
    }else if(yongi_volume == "4500"){
        yongi_volume = "4.5l 이하";
    }else if(yongi_volume == "5000"){
        yongi_volume = "5l 이하";
    }else{
        yongi_volume = "5l 초과";
    }

    let newReview = new Review();
    newReview.title = title;
    newReview.content = content;
    newReview.filename = filename;
    newReview.place_name = place_name;
    newReview.place_id = place_id;
    newReview.yongi_type = yongi_type;
    newReview.yongi_volume = yongi_volume;
    newReview.yongi_rating = yongi_rating;
    newReview.writer = writer;

    newReview.save((err, data) => {
        if(err){
            console.log(err);
        }
        else{
            req.session.save(() => {
                res.redirect('/review');
            })
        }
    });
})

module.exports = router;