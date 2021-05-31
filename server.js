var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var fs = require('fs');

// 서버가 읽을 수 있도록 위치 지정
app.set('views', [path.join(__dirname + '/views'),
path.join(__dirname, 'views/challenge/'),
path.join(__dirname, 'views/envinfo/'),
path.join(__dirname, 'views/mypage/'),
path.join(__dirname, 'views/place/')],
path.join(__dirname, 'views/review/'),
path.join(__dirname, 'views/account/'));
// 서버가 HTML 렌더링 할 때 EJS 엔진 사용
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

var server = app.listen(3000, () => console.log("Express server has started "));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret:'@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

// 라우터 모듈인 main.js를 불러와서 app에 전달
// router에서 fs 모듈을 사용할 수 있도록 인자에 추가
var router = require('./router/main')(app, fs);

app.use("/place", require('./router/place.js'));
app.use("/account", require('./router/account.js'));
app.use("/review", require('./router/review.js'));