const User = require("../models/Users");
const Log = require("../models/Logs");
const logger = require("../config/logger");

const output = {
  Main: (req, res) => {
    // logger.info("GET /sound 200 '회원가입 화면으로 이동'");
    console.log("메인 페이지 이동");
    res.render("Main");
  },

  social_login_kakao: (req, res) => {
    console.log("카카오 로그인 화면 이동");
    res.render("Main");
  },

  login: (req, res) => {
    console.log("로그인 화면 이동");
    res.render("login");
  },

  register: (req, res) => {
    console.log("회원가입 화면 이동");
    res.render("register");
  },

  chat: (req, res) => {
    console.log("음성인식 페이지 이동");
    res.render("chat");
  },

  Record_ready: (req, res) => {
    console.log("소리인식 페이지 이동");
    res.render("Record_ready");
  },

  Setting: (req, res) => {
    console.log("회원관리 페이지 이동");
    res.render("Setting");
  },

  Stat_spot: (req, res) => {
    console.log("위치통계 페이지 이동");
    res.render("Stat_spot");
  },

  Stat_time: (req, res) => {
    console.log("기간통계 페이지 이동");
    res.render("Stat_time");
  },

  LoginSignup: (req, res) => {
    console.log("로그인 회원가입 페이지 이동");
    res.render("LoginSignup");
  },

  kakaomap: (req, res) => {
    console.log("메인 페이지 이동");
    res.render("kakaomap");
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    if (response.err) {
      logger.error(
        `POST /login 200 Response : 'success:${response.success}, msg:${response.err}`
      );
    } else {
      logger.info(
        `POST /login 200 Response : 'success:${response.success}, msg:${response.msg}`
      );
    }
    return res.json(response);
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.Register();
    if (response.err) {
      logger.error(
        `POST /register 200 Response : 'success:${response.success}, msg:${response.err}`
      );
    } else {
      logger.info(
        `POST /register 200 Response : 'success:${response.success}, msg:${response.msg}`
      );
    }
    return res.json(response);
  },

  deleteacc: async (req, res) => {
    const user = new User(req.body);
    const response = await user.Delete();
    if (response.err) {
      logger.error(
        `POST /delete 200 Response : 'success:${response.success}, msg:${response.err}`
      );
    } else {
      logger.info(
        `POST /delete 200 Response : 'success:${response.success}, msg:${response.msg}`
      );
    }
    return res.json(response);
  },

  changepw: async (req, res) => {
    const user = new User(req.body);
    const response = await user.changepw();
    if (response.err) {
      logger.error(
        `POST /change 200 Response : 'success:${response.success}, msg:${response.err}`
      );
    } else {
      logger.info(
        `POST /change 200 Response : 'success:${response.success}, msg:${response.msg}`
      );
    }
    return res.json(response);
  },

  SaveLog: async (req, res) => {
    const log = new Log(req.body);
    const response = await log.SaveLog();
    if (response.err) {
      logger.error(
        `POST /SaveLog 200 Response : 'success:${response.success}, msg:${response.err}`
      );
    } else {
      logger.info(
        `POST /SaveLog 200 Response : 'success:${response.success}, msg:${response.msg}`
      );
    }
    return res.json(response);
  },

  GetDataByClassDate: async (req, res) => {
    const log = new Log(req.body);
    const response = await log.GetDataByClassDate();
    if (response.err) {
      logger.error(
        `POST /GetDataByClassDate 200 Response : 'success:${response.success}, msg:${response.err}`
      );
    } else {
      logger.info(
        `POST /GetDataByClassDate 200 Response : 'success:${response.success}, msg:${response.msg}`
      );
    }
    return res.json(response);
  },

  GetDataByDate: async (req, res) => {
    const log = new Log(req.body);
    const response = await log.GetDataByDate();
    if (response.err) {
      logger.error(
        `POST /GetDataByDate 200 Response : 'success:${response.success}, msg:${response.err}`
      );
    } else {
      logger.info(
        `POST /GetDataByDate 200 Response : 'success:${response.success}, msg:${response.msg}`
      );
    }
    return res.json(response);
  },

  GetMyDataByDate: async (req, res) => {
    const log = new Log(req.body);
    const response = await log.GetMyDataByDate();
    if (response.err) {
      logger.error(
        `POST /GetMyDataByDate 200 Response : 'success:${response.success}, msg:${response.err}`
      );
    } else {
      logger.info(
        `POST /GetMyDataByDate 200 Response : 'success:${response.success}, msg:${response.msg}`
      );
    }
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
