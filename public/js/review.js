// 장소 검색 객체
var ps = new kakao.maps.services.Places();

function searchPlaces(){
    var keyword = document.getElementById('keyword').value;
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }
    ps.keywordSearch(keyword, placesSearchCB);
}

// 장소검색 결과 띄우고 eventlistener붙이기 함수
function placeList(data){
    console.log(data);
    const placelist = document.getElementById("placelist");
    for(let i = 0; i < data.length; i ++){
        let place = data[i];
        placelist.innerHTML += "<div class = 'placelist_result' id =" +  place.id + "><li><ul><li><strong>" + place.place_name + "</strong></li>" +
        "<li>주소:" + place.address_name + "</li>" + "</ul></li></div>";
    }

    // eventlistner 나중에 붙이기
}

// 장소검색이 완료됐을 때 호출되는 콜백함수
function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        placeList(data);
        return false;

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return false;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return false;

    }
}

document.getElementById("keyword_search").addEventListener("click", searchPlaces);

const results = document.getElementsByClassName("placelist_result");
console.log("results" + results);

/*
document.getElementById("create_review").addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    let yongi_type = document.getElementById("yongi_type").value;
    let yongi_volume = document.getElementById("yongi_volume").value;
    
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

    let yongi_rating;
    for(let i = 1; i <= 5; i ++){
        let id = "yongi_rating_" + i;
        let check = document.getElementById(id).checked;
        if(check){
            yongi_rating = document.getElementById(id).value;
            break;
        }
    }
    
    let container = {};
    container.title = title;
    container.content = content;
    container.yongi_type = yongi_type;
    container.yongi_volume = yongi_volume;
    container.yongi_rating = yongi_rating;

    fetch('/review/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(container)
    }).then((data) => {
        return data.json();
    }).then((data) => {
        const success = data.success;
        if(success){
            window.location.href = "/review";
            return;
        }else{
            window.alert("ERROR");
        }
    })
});
*/