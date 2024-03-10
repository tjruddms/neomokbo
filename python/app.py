

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