const userInfo = require("./config.json");

const options = {
  host: userInfo.serverIP, // optional
  port: 25565, // optional
  username: userInfo.userMail, // email and password are required only for
  password: userInfo.password, // online-mode=true servers
  version: "1.8.8", // false corresponds to auto version detection (that's the default), put for example "1.8.8" if you need a specific version
  botToken: userInfo.botToken,
  joinCommand: userInfo.joinCommand,
  wallCheckFrequency: userInfo.wallCheckFrequency,
  bufferCheckFrequency: userInfo.bufferCheckFrequency,
  joinCommandFrequency: userInfo.joinCommandFrequency,
  serverIP: userInfo.serverIP,
  prefix: userInfo.prefix,
};

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

module.exports = {
  options,
  wait,
};
