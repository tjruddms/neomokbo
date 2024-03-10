const UserStorage = require("./UserStorage")

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    try {
      const { email, pw } = await UserStorage.GetUserInfo(client.email);

      if (email) {
        if (email === client.email && pw === client.pw) {
          return { success: true, };
        }
        return { success: false, msg: "wrong pw" };
      }
      return { success: false, msg: "email not exist" };
    }
    catch (err) {
      return { success: false, err };
    }
  };

  async Register() {
    const client = this.body;
    try {
      const response = await UserStorage.Save(client)
      return response;
    }
    catch (err) {
      return { success: false, err };
    }
  }

  async Delete() {
    const client = this.body;
    try {
      const response = await UserStorage.Delete(client)
      return response;
    }
    catch (err) {
      return { success: false, err };
    }
  }

  async changepw() {
    const client = this.body;
    try {
      const response = await UserStorage.changepw(client)
      return response;
    }
    catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = User;

