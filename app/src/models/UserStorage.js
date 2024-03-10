const db = require("../config/db");

class UserStorage {
  static GetUserInfo(email) {
    return new Promise((resolve, reject) => {
      const query = "select * from users where email = ?;";
      db.query(query, [email], (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      });
    })
  }

  // 회원가입
  static async Save(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "insert into users (email, pw) values(?, ?);";
      db.query(query, [userInfo.email, userInfo.pw], (err, data) => {
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    })
  }

  // 회원탈퇴
  static async Delete(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "delete from users where email like (?);";
      console.log(query);
      db.query(query, [userInfo.email], (err, data) => {
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    })
  }

  // 비밀번호 변경
  static async changepw(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "update users set pw = (?) where email = (?);";
      db.query(query, [userInfo.pw, userInfo.email], (err, data) => {
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    })
  }
}


module.exports = UserStorage;


