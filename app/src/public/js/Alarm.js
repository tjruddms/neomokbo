const notificationImage = document.getElementById("notification-image");
const notificationText = document.getElementById("notification-text");
let notificationIndex = 1;
var soundPrefix, bgColor, textContent, bgImage;

document.addEventListener("DOMContentLoaded", function () {
  $("#status").show();
  $(".Alarm").hide();
});

const nowclass = document.querySelector("#soundnow");
nowclass.addEventListener("input", () => {
  console.log("값 변경됨:", nowclass.innerHTML);
  showNotification(nowclass.innerHTML);
})

// 소리 알림을 받으면 알림 이미지를 변경하고 배경 색상도 변경하는 함수
function showNotification(soundType) {
  notificationIndex = notificationIndex === 1 ? 2 : 1;

  switch (soundType) {
    case "환경":
    case "아이들":
    case "웅성":
      // console.log("대기화면으로돌아감")
      $("#status").show();
      $(".Alarm").hide();
      break;
    case "경적":
      soundPrefix = "carhorn";
      bgColor = notificationIndex === 1 ? "" : "magenta";
      textContent = notificationIndex === 1 ? "자동차 경적 소리" : "뛰뛰빵빵~";
      bgImage = notificationIndex === 1 ? "carhorn1.png" : "carhorn2.png";
      asdfasdf();
      break;
    case "개짖는":
      soundPrefix = "dogbark";
      bgColor = notificationIndex === 1 ? "" : "aqua";
      textContent = notificationIndex === 1 ? "강아지 짖는소리" : "멍멍!!";
      bgImage = notificationIndex === 1 ? "dogbark1.png" : "dogbark2.png";
      asdfasdf();
      break;
    case "사이렌":
      soundPrefix = "alert";
      bgColor = notificationIndex === 1 ? "" : "white";
      textContent = notificationIndex === 1 ? "사이렌 소리" : "삐뽀삐뽀";
      bgImage = notificationIndex === 1 ? "alert1.png" : "alert2.png";
      asdfasdf();
      break;
    case "비상벨":
      soundPrefix = "fire";
      bgColor = notificationIndex === 1 ? "yellow" : "red";
      textContent = notificationIndex === 1 ? "화재 경보" : "대피하세요!";
      bgImage = notificationIndex === 1 ? "fire1.png" : "fire2.png";
      asdfasdf();
      break;
    default:
      return;
  }


}

function asdfasdf() {
  notificationImage.src = `../${soundPrefix}${notificationIndex}.png`;
  const backgroundAnimation = document.getElementById("background-animation");
  backgroundAnimation.style.backgroundColor = bgColor;
  // backgroundAnimation.style.backgroundImage = `url('../${bgImage}')`;
  notificationText.style.color = "#243040";
  notificationText.textContent = textContent;
  // 소리 알림이 울리면 Alarm 안에 있는 요소들을 보이게 함
  $(".Alarm").show();
  // 소리 알림이 울리지 않으면 status 안에 있는 요소들을 보이게 함
  $("#status").hide();
}
