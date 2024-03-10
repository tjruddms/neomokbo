const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const bodyParser = require("body-parser")
const dotenv = require("dotenv")

dotenv.config()

// set view engine
app.set("views", "./src/public/views")
app.set("view engine", "ejs")

// set middleware
app.use(require("express").static(`${__dirname}/src/public`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// import router
const router = require("./src/routes")
app.use("/", router)

// handle socket.io
io.on("connection", (socket) => {
  console.log("새로운 웹소켓 열림");

  // 클라이언트로부터 소리 데이터를 전송받음
  socket.on('micBinaryStream', (data) => {
    // 여기에 소리 데이터를 처리하는 로직을 추가할 수 있음
    console.log('Received audio data:', data);
    // 예를 들어, 다른 클라이언트에게 소리 데이터를 전송하거나 분석하는 등의 작업을 수행할 수 있음
  });

  // 클라이언트가 연결을 종료할 때 처리
  socket.on('disconnect', () => {
    console.log('A client disconnected.');
  });
});


module.exports = app
module.exports = http
