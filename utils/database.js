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
        wallMinuteUnchecked: 0,
      },
      bufferChecks: {
        lastBufferChecked: today.getTime(),
        bufferMinuteUnchecked: 0,
      },
      temporaryUser: [],
      prevFtop: [],
      channels: {
        announcements: "",
        weewoo: "",
        wallchecks: "",
        bufferchecks: "",
        serverchat: "",
        ftop: "",
        flist: "",
        verify: "",
      },
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
          wallChecks: 0,
          bufferChecks: 0,
          lastWallChecked: today.getTime(),
          lastBufferChecked: today.getTime(),
        },
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
    wallCheckObj.update("wallMinuteUnchecked", (n) => (n = 0)).write();
  },
  updateBufferChecked(userBufferObj, currentTime) {
    const bufferCheckObj = this.getBufferChecksObject();
    userBufferObj.update("bufferChecks", (n) => n + 1).write();
    userBufferObj.update("lastBufferChecked", (n) => (n = currentTime)).write();
    bufferCheckObj
      .update("lastBufferChecked", (n) => (n = currentTime))
      .write();
    bufferCheckObj.update("bufferMinuteUnchecked", (n) => (n = 0)).write();
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
    db.setState(newState).write();
    this.createDatabase();
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
};
