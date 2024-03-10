import io
from flask import Flask, jsonify, request
import numpy as np
import pandas as pd
from keras.models import load_model
import librosa
import json
import matplotlib.pyplot as plt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mymodel = load_model("neomokbo.h5")

def CutSoundHalfSec(datas, sr):
    data = pd.DataFrame(columns=["feature", "label"])
    adddata = pd.DataFrame(columns=["feature", "label"])
    for i in range(0, len(datas) // (sr // 1)):
        segment = datas[(sr // 1) * i : (sr // 1) * (i + 1)]
        if len(segment) == sr // 1:  # 0.5초 길이인 경우에만 처리
            mfcc = librosa.feature.mfcc(y=segment, sr=sr, n_mfcc=20)
            adddata = pd.DataFrame({"feature": [mfcc]})
            data = pd.concat([data, adddata])
    return data

def Mel_S(y, sr):
    S = librosa.feature.melspectrogram(y=y)

    print("Wav length: {}, Mel_S shape:{}".format(len(y) / sr, np.shape(S)))

    plt.figure(figsize=(10, 4))
    librosa.display.specshow(
        librosa.power_to_db(S, ref=np.max), y_axis="mel", sr=sr, x_axis="time"
    )
    plt.colorbar(format="%+2.0f dB")
    plt.title("Mel-Spectrogram")
    plt.tight_layout()
    plt.savefig("Mel-Spectrogram example.png")
    plt.show()
    plt.clf()
    return S

@app.route('/data', methods=['POST'])
def receive_wav_data():
    wav_data = request.data
    data_str = wav_data.decode('utf-8')
    data_dict = json.loads(data_str)
    array_data = data_dict.get('data', [])

    preddata = CutSoundHalfSec(np.array(array_data), 22050)

    pred_test = mymodel.predict(np.array([preddata.feature.iloc[0]]))
    pred_index = np.argmax(pred_test[0])

    class_labels = ["환경", "웅성", "아이들", "경적", "개짖는", "사이렌","비상벨"]
    # for i, label in enumerate(class_labels):
    #     print(label, ":", int(pred_test[0][i] * 100), "%")
    print("제일 큰 값 : ",class_labels[pred_index])

    response_data = {
        "result": pred_index
    }
        
    return class_labels[pred_index], 200

if __name__ == "__main__":
    app.run(debug=False, host='127.0.0.1', port=3333)
