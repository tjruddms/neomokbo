import os
import librosa
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

# 소리 파일이 저장된 디렉토리 경로
directory = "./audio"

data = pd.DataFrame(columns=["feature", "label"])
adddata = pd.DataFrame(columns=["feature", "label"])
label_list = {1: 0, 3: 1, 8: 2}

for root, dirs, files in os.walk(directory):
    for filename in files:
        # print(filename)
        if filename.endswith(".wav") and (
            int(filename.split("-")[1]) in (1, 3, 8)
        ): 
            label = int(filename.split("-")[1])  # 파일 이름 파싱해서 라벨 추출
            file_path = os.path.join(root, filename)
            y, sr = librosa.load(file_path)  # 소리 파일 불러오기
            # 1초 단위로 소리를 데이터프레임에 추가
            for i in range(0, len(y) // sr):
                mfcc = librosa.feature.mfcc(
                    y=y[sr * i : sr * (i + 1)], sr=sr, n_mfcc=20
                )
                adddata = pd.DataFrame(
                    {"feature": [mfcc], "label": [label_list[label]]}
                )
                # print("add data : ", adddata)
                data = pd.concat([data, adddata])

def main():
  from keras.models import load_model
  import sys

  mymodel = load_model("./neomokbo.h5")
  # mymodel.predict(np.array([test.feature.iloc[0]]))

  print('python in nodejs and get')
  print(len(sys.argv))
  print(type(sys.argv[1]))

if __name__ == '__main__':
  main()