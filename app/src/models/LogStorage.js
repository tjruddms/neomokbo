const db = require("../config/db");

class LogStorage {
  static SaveLog(req) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO event_log (email, class, lat, lng) 
        VALUES (?, ?, ?, ?);`;
      console.log(req.email, req.sclass, req.lat, req.lng);
      db.query(query, [req.email, req.sclass, req.lat, req.lng], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  // 위치별 통계에서 사용할 쿼리문
  // 날짜, 클래스 지정 가능
  static GetDataByClass(req) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT lat, lng FROM event_log WHERE class IN (?) AND event_time BETWEEN ? AND ?;";
      db.query(query, [req.sclass, (req.start + " 00:00:00"), (req.end + " 23:59:59")], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  // 위치별 통계에서 사용할 쿼리문
  // 날짜 지정 가능 사용자 모두
  static GetDatasByDate(req) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT lat, lng FROM event_log WHERE class IN (?) AND event_time BETWEEN ? AND ?;";
      db.query(query, [req.sclass, (req.start + " 00:00:00"), (req.end + " 23:59:59")], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  // 위치 통계에서 사용할 쿼리문
  // 날짜 지정 가능, 사용자 본인
  static GetDataByClassDate(req) {
    return new Promise((resolve, reject) => {
      const query = `SELECT lat, lng FROM event_log 
      WHERE class IN (?) AND event_time BETWEEN ? AND ?;`;
      db.query(query, [req.sclass, (req.start + " 00:00:00"), (req.end + " 23:59:59")], (err, data) => {
        if (err) reject(err);
        else { console.log(data); resolve(data) };
      });
    });
  }

  // 기간별 통계에서 사용할 쿼리문
  // 날짜 지정 가능, 사용자 본인
  static GetDataByDate(req) {
    return new Promise((resolve, reject) => {
      const query = `SELECT lat, lng FROM event_log 
        WHERE email=(?) AND event_time BETWEEN ? AND ?;`;
      db.query(query, [req.email, (req.start + " 00:00:00"), (req.end + " 23:59:59")], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static GetClassesByDate(req) {
    return new Promise((resolve, reject) => {
      const query = `SELECT class FROM event_log 
        WHERE email=(?) AND event_time BETWEEN (?) AND (?);`;
      db.query(query, [req.email, (req.start + " 00:00:00"), (req.end + " 23:59:59")], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static GetMyDataByDate(req) {
    return new Promise((resolve, reject) => {
      const query = `SELECT class FROM event_log 
        WHERE email=(?) AND event_time BETWEEN (?) AND (?);`;
      db.query(query, [req.email, (req.start + " 00:00:00"), (req.end + " 23:59:59")], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
}


module.exports = LogStorage;


