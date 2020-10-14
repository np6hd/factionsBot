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
  url: "https://crafatar.com/avatars/",
  tnturl: "https://i.imgur.com/oAJOKSy.jpg",
  ftopFrequency: userInfo.ftopFrequency,
  flistFrequency: userInfo.flistFrequency,
  getDifference(previousTime, currentTime) {
    var d = Math.abs(currentTime - previousTime) / 1000;
    var r = {};
    Object.keys(timeFormat).forEach(function (key) {
      r[key] = Math.floor(d / timeFormat[key]);
      d -= r[key] * timeFormat[key];
    });
    return r;
  },
};

const timeFormat = {
  months: 2592000,
  weeks: 604800,
  days: 86400,
  hours: 3600,
  minutes: 60,
  seconds: 1,
};

const setChannelArgs = [
  "announcements",
  "weewoo",
  "wallchecks",
  "bufferchecks",
  "serverchat",
  "ftop",
  "flist",
  "verify",
];

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

module.exports = {
  options,
  wait,
  setChannelArgs,
};
