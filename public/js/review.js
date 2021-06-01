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
        placelist.innerHTML += "<li><div class = 'placelist_result' id =" +  place.id + ">" + place.place_name +
        "주소:" + place.address_name + "</div></li>";
    }

    // eventlistner 나중에 붙이기
    const results = document.getElementsByClassName("placelist_result");
    for(let i = 0; i < results.length; i ++){
        results[i].addEventListener("click", function(event){
            event.stopPropagation();
            const place_id = event.target.id;
            // place_id에 선택된 가게 id 등록
            document.getElementById("place_id").value = place_id;
            // keyword에 선택된 가게 이름 등록
            document.getElementById("keyword").value = data[i].place_name;
            // place_name에 선택된 가게 이름 등록
            document.getElementById("place_name").value = data[i].place_name;
        })
    }
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