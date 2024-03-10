const LogStorage = require("./LogStorage");


class Log {
  constructor(body) {
    this.body = body;
  }

  async SaveLog() {
    const client = this.body;
    try {
      const response = await LogStorage.SaveLog(client)
      return response;
    }
    catch (err) {
      return { success: false, err };
    }
  }

  async GetDataByClass() {
    const client = this.body;
    try {
      const response = await LogStorage.GetDataByClass(client)
      return response;
    }
    catch (err) {
      return { success: false, err };
    }
  }

  async GetDataByClassDate() {
    const client = this.body;
    try {
      const response = await LogStorage.GetDataByClassDate(client)
      return response;
    }
    catch (err) {
      return { success: false, err };
    }
  }

  async GetDataByDate() {
    const client = this.body;
    try {
      const response = await LogStorage.GetDataByDate(client)
      return response;
    }
    catch (err) {
      return { success: false, err };
    }
  }

  async GetMyDataByDate() {
    const client = this.body;
    try {
      const response = await LogStorage.GetMyDataByDate(client)
      return response;
    }
    catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = Log;

