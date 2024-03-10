const chatWindow = document.getElementById('chat-window');
const startButton = document.getElementById('voice-recognition-btn');
const stopButton = document.getElementById('stop-recognition');
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const voiceRecognitionBtn = document.querySelector('.circle__btn');
const wave1 = document.querySelector('.circle__back-1');
const wave2 = document.querySelector('.circle__back-2');
let recognition;
let isRecording = false;
let inputTimer;
let timeout = 0;

startButton.addEventListener('click', () => {
  voicerecognitionbtn();
});

stopButton.addEventListener('click', () => {
  stopRecognition();
});

voiceRecognitionBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (!isRecording) {
    startRecognition();
  } else {
    stopRecognition();
  }
  pause.classList.toggle('visibility');
  play.classList.toggle('visibility');
  voiceRecognitionBtn.classList.toggle('shadow');
  wave1.classList.toggle('paused');
  wave2.classList.toggle('paused');
});

function startRecognition() {
  recognition = new window.webkitSpeechRecognition();
  recognition.lang = 'ko-KR';
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onend = () => {
    isRecording = false;
    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
    appendMessage('assistant', '음성 입력이 중지되었습니다.');
  };

  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    const text = result[0].transcript;
    appendMessage('user', text);

  };

  recognition.start();
  isRecording = true;
}

function stopRecognition() {
  if (isRecording) {
    recognition.stop();
  }
  isRecording = false;
}

function appendMessage(sender, text) {
  const messageDiv = document.createElement('div');
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('message-container');

  if (sender === 'user') {
    messageDiv.classList.add('user-message');
  } else {
    messageDiv.classList.add('assistant-message');
  }

  messageDiv.textContent = text;

  const timeNode = document.createElement('div');
  timeNode.textContent = new Date().toLocaleTimeString('ko-KR', { hour: 'numeric', minute: 'numeric' });
  timeNode.style.color = 'lightgray';
  timeNode.style.fontSize = '12px';
  timeNode.style.position = 'relative';

  if (sender === 'user') {
    timeNode.style.textAlign = 'left';
    messageDiv.style.textAlign = 'left';

  } else {
    timeNode.style.textAlign = 'none';
    timeNode.style.display = 'none';
    messageDiv.style.textAlign = 'left';

  }

  containerDiv.appendChild(messageDiv);
  containerDiv.appendChild(timeNode);

  chatWindow.appendChild(containerDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  setTimeout(() => {
    containerDiv.classList.add('show');
  }, 100);

}

wave1.classList.add('paused');
wave2.classList.add('paused');
