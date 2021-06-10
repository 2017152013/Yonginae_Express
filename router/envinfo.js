var express = require('express');
var router = express.Router();
var request = require('request');
const entities = require('entities');
var client_id = 'DxocRVm9ufqXZne6F29K';
var client_secret = '_elfLRIJal';

router.get('/', function(req, res){

    var api_url = "https://openapi.naver.com/v1/search/news.json?display=10&query=" + encodeURI("용기내 챌린지");
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };

    // 뉴스 검색 결과 저장
    let env_news;

    request.get(options, function(error, response, body){
        if (!error && response.statusCode == 200) {
            //res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            env_news = JSON.parse(body);

            // decode html entities and remove <b></b>
            for(let i = 0; i < env_news.items.length; i ++){
                
                let title = entities.decodeHTML(env_news.items[i].title);
                title = title.replace(/<b>/g, "");
                title = title.replace(/<\/b>/g, "");
                env_news.items[i].title = title;
                
                env_news.items[i].description = entities.decodeHTML(env_news.items[i].description);
            }


            res.render('envinfo/envinfo', {
                title: "envinfo",
                css:"css/main.css",
                is_logined:req.session.is_logined,
                user:req.session.user,
                env_news:env_news
            });
          } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
          }
    })

    
    
    
    return;
});

module.exports = router;
