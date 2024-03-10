const tf = require("@tensorflow/tfjs");

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 소리 파일이 저장된 디렉토리 경로
const directory = "./audio";

// 데이터 프레임을 생성하여 데이터를 저장할 준비를 합니다.
let data = [];
let addData = [];
const labelList = { 1: 0, 3: 1, 8: 2 };

// 현재 디렉토리와 그 하위의 모든 폴더에 대해 순회합니다.
fs.readdirSync(directory, { withFileTypes: true }).forEach(entry => {
  const fullPath = path.join(directory, entry.name);
  if (entry.isDirectory()) {
    // 각 폴더에 있는 파일에 대해 처리합니다.
    fs.readdirSync(fullPath).forEach(filename => {
      if (filename.endsWith(".wav")) {  // WAV 파일인 경우에만 처리합니다.
        const label = parseInt(filename.split("-")[1]);  // 파일 이름 파싱해서 라벨 추출
        const filePath = path.join(fullPath, filename);
        const stdout = execSync(`ffmpeg -i ${filePath} -af aformat=s16:44100 ${filePath}.wav`); // 파일 변환
        const y = null; // 소리 파일 불러오기
        const sr = null;
        // 1초 단위로 소리를 데이터 배열에 추가
        for (let i = 0; i < y.length / sr; i++) {
          const mfcc = null; // librosa.feature.mfcc 호출
          addData.push({ feature: mfcc, label: labelList[label] });
        }
        data = data.concat(addData);
      }
    });
  }
});

// const fs = require('fs');
const wav = require('node-wav').decode;
// const { execSync } = require('child_process');
const plotly = require('plotly')('username', 'apiKey'); // Plotly 계정 정보를 입력하세요.

function melS(wavFile) {
  // Mel-Spectrogram 계산 코드를 여기에 작성하세요.
  // Node.js에서 오디오 파일을 읽고 MFCC를 계산하는 방법을 사용하세요.
  // 이 부분은 음성 처리 라이브러리를 사용해야 합니다.
  // 예시: https://github.com/TOPLab-UNMC/node-mfcc

  // 계산된 Mel-Spectrogram 데이터를 반환합니다.
  return melSpectrogramData;
}

function plotMelSpectrogram(data) {
  // Plotly를 사용하여 Mel-Spectrogram을 시각화합니다.
  // Plotly 사용 방법은 Plotly 문서를 참조하세요.
  // https://plotly.com/javascript/
}

const audioFiles = [
  "./audio/fold1/101415-3-0-2.wav",
  "./audio/fold1/101415-3-0-3.wav",
  "./audio/fold1/101415-3-0-8.wav",
  "./audio/fold1/106905-8-0-3.wav",
  "./audio/fold1/164053-8-3-0.wav"
];

audioFiles.forEach(file => {
  const melSpec = melS(file);
  plotMelSpectrogram(melSpec);
});
