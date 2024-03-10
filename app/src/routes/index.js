const express = require('express');
const router = express.Router();

const ctrl = require("./home.ctrl")

// GET
router.get("/", ctrl.output.LoginSignup);
router.get("/login", ctrl.output.login);
router.get("/social_login/kakao", ctrl.output.social_login_kakao);
router.get("/register", ctrl.output.register);
router.get("/LoginSignup", ctrl.output.LoginSignup); // 시작화면
router.get("/Main", ctrl.output.Main);
router.get("/kakaomap", ctrl.output.kakaomap);
router.get("/chat", ctrl.output.chat);
router.get("/Record_ready", ctrl.output.Record_ready);
router.get("/Setting", ctrl.output.Setting);
router.get("/Stat_time", ctrl.output.Stat_time);
router.get("/Stat_spot", ctrl.output.Stat_spot);

// POST
router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/deleteacc", ctrl.process.deleteacc);
router.post("/changepw", ctrl.process.changepw);
router.post("/SaveLog", ctrl.process.SaveLog);
router.post("/GetDataByClassDate", ctrl.process.GetDataByClassDate);
router.post("/GetDataByDate", ctrl.process.GetDataByDate);
router.post("/GetMyDataByDate", ctrl.process.GetMyDataByDate);

module.exports = router;