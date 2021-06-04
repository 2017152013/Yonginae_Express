Kakao.init('312f9c7ea0102d2e9f3bf43432d99728');

// kakao-link-btn에 eventListener 추가
const btns = document.getElementsByClassName("kakao-link-btn");
for (btn of btns) {
  const btn_id = btn.id;
  btn.style.cursor = "pointer";
  btn.addEventListener("click", function () {
    send(btn_id);
  });
}

// function
function send(btn_id) {
  const container = {
    "id": btn_id
  };
  fetch('/challenge/read', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(container)
  }).then((data) => {
    return data.json();
  }).then((data) => {
    const id = data.id;
    const title = data.title;
    const content = data.content;
    const filename = data.filename;

    sendLink(id, title, content, filename);
  })
}


function sendLink(id, title, content, filename) {
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: title,
      description: content,
      imageUrl: 'http://localhost:3000/uploads' + filename,
      link: {
        mobileWebUrl: 'http://localhost:3000/',
        webUrl: 'http://localhost:3000/',
      },
    },
    social: {
      likeCount: 286,
      commentCount: 45,
      sharedCount: 845,
    },
    buttons: [{
      title: '용기내 챌린지 보러가기',
      link: {
        mobileWebUrl: 'http://localhost:3000/challenge',
        webUrl: 'http://localhost:3000/challenge',
      },
    }, ],
  });
  
  // 챌린지 데이터 등록
  registerChallenge(id);
}

function registerChallenge(id){
  console.log("registerChallenge");
  let container = {};
  container.id = id;
  fetch('/challenge/register_challenge', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(container)
  }).then((data) => {
    return data.json();
  }).then((data) => {
    window.alert(data.message);
  }).then(() => {
    window.location.href = "/challenge";
  })
}