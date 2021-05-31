var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('place/place', {
        title: "place",
        css:"css/main.css",
        is_logined:req.session.is_logined,
        user:req.session.user
    });
    return;
})


module.exports = router;