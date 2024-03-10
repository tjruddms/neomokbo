const chatWindow = document.getElementById('chat-window');
const startButton = document.getElementById('start-recognition');
const stopButton = document.getElementById('stop-recognition');
let recognition;
let isRecording = false;
let inputTimer; // 음성 입력 타이머 ID
// const INPUT_TIMEOUT = 5000; // 음성 입력 시간 (밀리초)
let timeout = 0;

startButton.addEventListener('click', () => {
  startRecognition();
});

stopButton.addEventListener('click', () => {
  stopRecognition();
});

function startRecognition() {
  startButton.style.display = 'none';
  stopButton.style.display = 'inline-block';


  recognition = new window.webkitSpeechRecognition(); // Chrome 브라우저를 위한 코드
  recognition.lang = 'ko-KR'; // 한국어 설정
  recognition.continuous = true; // 연속적인 인식 가능하도록 설정
  recognition.interimResults = false; // 중간 결과를 반환하도록 설정

  recognition.onend = () => {
    isRecording = false;
    startButton.style.display = 'inline-block'; // 음성 입력 종료 후 버튼 상태를 "음성 입력 시작"으로 변경
    stopButton.style.display = 'none';

  };

  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    const text = result[0].transcript;
    appendMessage('user', text);
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      recognition.stop();
      appendMessage('assistant', "음성 입력이 중지되었습니다.");

    }, 3000);
  };

  recognition.start();
}

function stopRecognition() {
  if (isRecording) {
    recognition.stop();
  }
}

function appendMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = text;
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('message-container');
  if (sender === 'user') {
    messageDiv.classList.add('user-message');
    containerDiv.appendChild(messageDiv);
  } else {
    messageDiv.classList.add('assistant-message');
    containerDiv.appendChild(messageDiv);
  }
  chatWindow.appendChild(containerDiv);

}
/*  play button */
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const playBtn = document.querySelector('.circle__btn');
const wave1 = document.querySelector('.circle__back-1');
const wave2 = document.querySelector('.circle__back-2');

playBtn.addEventListener('', function (e) {
  e.preventDefault();
  pause.classList.toggle('visibility');
  play.classList.toggle('visibility');
  playBtn.classList.toggle('shadow');
  wave1.classList.toggle('paused');
  wave2.classList.toggle('paused');
});
