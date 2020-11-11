const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./dataStorage.json");
const db = low(adapter);
const today = new Date();

module.exports = {
  createDatabase() {
    db.defaults({
      users: [],
      wallChecks: {
        lastWallChecked: today.getTime(),
        wallMinuteUnchecked: "",
      },
      bufferChecks: {
        lastBufferChecked: today.getTime(),
        bufferMinuteUnchecked: "",
      },
      temporaryUser: [],
      prevFtop: [],
      channels: {
        weewoo: "",
        wallchecks: "",
        bufferchecks: "",
        serverchat: "",
        ftop: "",
        flist: "",
        verify: "",
        bank: "",
      },
      times: {
        auto_ftop: 30,
        auto_flist: 10,
        auto_wallcheck: 3,
        auto_buffercheck: 6,
        auto_joincommand: 1,
        ping_walls_unchecked_after: 5,
        ping_buffers_unchecked_after: 5, 
        latency: 300,
      },
      commands: {
        joinCommand: "/random",
      },
      trackMoney: false,
      shield: true,
      totalUsers: 0,
    }).write();
    console.log("Default Database Created");
  },
  addUser(username, discordTag) {
    this.getAllUsersObject()
      .push({
        username: username,
        discordTag: discordTag,
        userWallChecks: {
          wallChecks: 1,
          bufferChecks: 1,
          lastWallChecked: today.getTime(),
          lastBufferChecked: today.getTime(),
        },
        deposits: 0,
        withdraws: 0,
        balance: 0,
      })
      .write();
    db.update("totalUsers", (n) => (n += 1)).write();
  },
  isInitalized: db.has("totalUsers").value(),
  isVerified(tag) {
    var found = "";
    this.getDiscordUserObject(tag).value() != undefined
      ? (found = true)
      : (found = false);
    return found;
  },
  isUserVerified(username) {
    var found = "";
    this.getUserObject(username).value() != undefined
      ? (found = true)
      : (found = false);
    return found;
  },
  isShieldOn() {
    return db.get("shield").value();
  },
  setChannel(channelName, channelID) {
    db.update(
      `channels.${channelName}`,
      (channel) => (channel = channelID)
    ).write();
  },
  getChannelID(channelName) {
    return db.get(`channels.${channelName}`).value();
  },
  getAllUsersObject() {
    return db.get("users");
  },
  getUserObject(username) {
    return this.getAllUsersObject().find({ username: username });
  },
  getDiscordUserObject(tag) {
    return this.getAllUsersObject().find({ discordTag: tag });
  },
  getTotalUsersObject() {
    return db.get("totalUsers");
  },
  getTotalUserValue() {
    return db.get("totalUsers").value();
  },
  getWallChecksObject() {
    return db.get("wallChecks");
  },
  getBufferChecksObject() {
    return db.get("bufferChecks");
  },
  updateWallChecked(userWallObj, currentTime) {
    const wallCheckObj = this.getWallChecksObject();
    userWallObj.update("wallChecks", (n) => n + 1).write();
    userWallObj.update("lastWallChecked", (n) => (n = currentTime)).write();
    wallCheckObj.update("lastWallChecked", (n) => (n = currentTime)).write();
    wallCheckObj.update("wallMinuteUnchecked", (n) => (n = "")).write();
  },
  updateBufferChecked(userBufferObj, currentTime) {
    const bufferCheckObj = this.getBufferChecksObject();
    userBufferObj.update("bufferChecks", (n) => n + 1).write();
    userBufferObj.update("lastBufferChecked", (n) => (n = currentTime)).write();
    bufferCheckObj
      .update("lastBufferChecked", (n) => (n = currentTime))
      .write();
    bufferCheckObj.update("bufferMinuteUnchecked", (n) => (n = "")).write();
  },
  toggleShield() {
    db.update("shield", (bool) => !bool).write();
  },
  createTempToken(discordTag) {
    const newToken =
      Math.random().toString(36).substr(2) +
      Math.random().toString(36).substr(2);
    db.get("temporaryUser")
      .push({
        token: newToken,
        discordTag: discordTag,
      })
      .write();
    return newToken;
  },
  removeTempToken(token) {
    return db.get("temporaryUser").remove({ token: token }).write();
  },
  deleteUser(userTag) {
    this.getAllUsersObject().remove({ discordTag: userTag }).write();
    db.update("totalUsers", (n) => (n -= 1));
  },
  resetDatabase() {
    const newState = {};
    let oldChannels = db.get("channels").value();
    db.setState(newState).write();
    this.createDatabase();
    db.update("channels", (ch) => (ch = oldChannels)).write();
  },
  resetTempUsers() {
    db.unset("temporaryUser").write();

    db.defaults({
      temporaryUser: [],
    }).write();
  },
  pushFtop(ftopData) {
    db.unset("prevFtop").write();
    db.defaults({ prevFtop: ftopData }).write();
  },
  findFaction(factionName) {
    return db.get("prevFtop").find({ factionName: factionName });
  },
  updateDeposit(username, val) {
    this.getUserObject(username)
      .update("deposits", (oldval) => (oldval += val))
      .write();
    this.getUserObject(username)
      .update("balance", (oldval) => (oldval += val))
      .write();
  },
  updateWithdraw(username, val) {
    this.getUserObject(username)
      .update("withdraws", (oldval) => (oldval += val))
      .write();
    this.getUserObject(username)
      .update("balance", (oldval) => (oldval -= val))
      .write();
  },
  toggleTrackMoney() {
    db.update("trackMoney", (b) => (b = !b)).write();
  },
  isTrackingMoney() {
    return db.get("trackMoney").value();
  },
  setTime(timeName, time) {
    db.update(`times.${timeName}`, (t) => (t = time)).write();
  },
  getTime(timeName) {
    return db.get(`times.${timeName}`).value();
  },
  setCommand(command, str) {
    db.update(`commands.${command}`, (newStr) => (newStr = str)).write();
  },
  getCommand(command) {
    return db.get(`commands.${command}`).value();
  },
  resetChannels() {
    db.update(
      "channels",
      (ch) =>
        (ch = {
          weewoo: "",
          wallchecks: "",
          bufferchecks: "",
          serverchat: "",
          ftop: "",
          flist: "",
          verify: "",
          bank: "",
        })
    ).write();
  },
};
