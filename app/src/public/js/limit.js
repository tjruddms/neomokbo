let recorder;
let audioChunks = [];

// 녹음 시작
function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => {
        audioChunks.push(e.data);
        sendData(); // 0.5초마다 데이터를 전송
      };
      recorder.start();
    })
    .catch(err => console.error('Error recording:', err));
}

// 녹음 중지
function stopRecording() {
  if (recorder.state === 'recording') {
    recorder.stop();
  }
}

// 녹음된 데이터 전송
function sendData() {
  if (audioChunks.length > 0) {
    const blob = new Blob(audioChunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('audio', blob);

    fetch('http://127.0.0.1:3333/data', {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
      .then(response => {
        // 서버로부터의 응답 처리
        console.log('Audio data sent successfully');
      })
      .catch(error => {
        console.error('Error sending audio data:', error);
      });
  }
}

// 시작 버튼 클릭 이벤트
document.getElementById('start').addEventListener('click', startRecording);

// 중지 버튼 클릭 이벤트
document.getElementById('stop').addEventListener('click', stopRecording);
