var stream;
var audioContext;
var processor;
var socket;
var sendbuffer = [];

var prev_sound = 0;
var now_sound = 0;

window.addEventListener("DOMContentLoaded", () => {
  startStreaming();
})
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

navigator.geolocation.watchPosition((coord, err, options) => {
  sessionStorage.setItem("lati", coord.coords.latitude)
  sessionStorage.setItem("long", coord.coords.longitude)
})

function startStreaming() {
  audioContext = new window.AudioContext({ sampleRate: 22050 });
  var bufferSize = 1024;
  processor = audioContext.createScriptProcessor(bufferSize, 1, 1);
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(handleMicStream)
    .catch(function (err) {
      console.log("getUserMedia error:", err);
    });
  function handleMicStream(streamObj) {
    stream = streamObj;
    var input = audioContext.createMediaStreamSource(stream);
    input.connect(processor);
    processor.connect(audioContext.destination);
    processor.onaudioprocess = function (e) {
      microphoneProcess(e);
    };
  }
  function microphoneProcess(e) {
    var left = e.inputBuffer.getChannelData(0);
    var loglist = [];
    Array.from(left).forEach((e, i) => {
      sendbuffer.push(Array.from(left)[i]);
    });
    if (sendbuffer.length > 22050) {
      for (let index = 0; index < 10; index++) {
        loglist[index] = sendbuffer[index];
      }
      sendAudioData(sendbuffer);
      sendbuffer = [];
    }
  }
}

function sendAudioData(audioData) {
  fetch("http://localhost:3333/data", {
    method: "post",
    body: JSON.stringify({
      data: audioData,
    }),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      if (data == "아이들" || data == "웅성") {
        data = "환경";
      }
      prev_sound = now_sound;
      now_sound = data;
      if (prev_sound == now_sound) {
        document.querySelector("#soundnow").innerHTML = data;
        document.querySelector("#soundnow").dispatchEvent(new Event('input'))
        if (now_sound != "환경") {
          DoSaveLog(now_sound)
        }
      }
    })
    .catch((error) => {
      console.error("오디오 데이터 전송 중 에러 발생:", error);
    });
}

// 스트리밍 중지 함수
function stopStreaming() {
  if (stream) {
    var tracks = stream.getTracks();
    tracks.forEach(function (track) {
      track.stop();
    });
  }

  if (processor) {
    processor.disconnect();
  }

  if (audioContext) {
    audioContext.close().then(function () {
      processor = null;
      audioContext = null;
    });
  }
}

function DoSaveLog(now_sound) {
  const req = {
    email: sessionStorage.email,
    sclass: now_sound,
    lat: sessionStorage.lati,
    lng: sessionStorage.long,
  }
  fetch('/SaveLog', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        console.log("save log success");
      } else {
        if (res.err) return console.log(res.err);
        console.log(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("로그 저장 에러 발생"));
    });
}