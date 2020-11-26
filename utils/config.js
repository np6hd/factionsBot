const config = require("../config.json");

const options = {
  host: config.serverip, // optional
  port: 25565, // optional
  username: config.username, // email and password are required only for
  password: config.password, // online-mode=true servers
  version: "1.8.8", // false corresponds to auto version detection (that's the default), put for example "1.8.8" if you need a specific version
  serverIP: config.serverip,
  botToken: config.botToken,
  prefix: config.prefix,
  minuteToMS: 60 * 1000,
  urls: {
    uuid: "https://crafatar.com/avatars/",
    tnt: "https://i.imgur.com/oAJOKSy.jpg",
    mojang: "https://authserver.mojang.com/authenticate",
    serverStatus: "https://api.mcsrvstat.us/2/",
  },
  channelCommands: [
    "weewoo",
    "wallchecks",
    "bufferchecks",
    "serverchat",
    "ftop",
    "flist",
    "verify",
    "bank",
  ],
  commands: ["joinCommand"],
  timeCommands: [
    "auto_ftop",
    "auto_flist",
    "auto_wallcheck",
    "auto_buffercheck",
    "auto_joincommand",
    "ping_walls_unchecked_after",
    "ping_buffers_unchecked_after",
    "latency",
  ],
  wait: (time) => new Promise((resolve) => setTimeout(resolve, time)),
  getDifference(previousTime, currentTime) {
    var d = Math.abs(currentTime - previousTime) / 1000;
    var r = {};
    Object.keys(timeFormat).forEach(function (key) {
      r[key] = Math.floor(d / timeFormat[key]);
      d -= r[key] * timeFormat[key];
    });
    return r;
  },
  boldWrap(str) {
    return "**".concat(str).concat("**");
  },
  singleWrap(str) {
    return "`".concat(str).concat("`");
  },
  tripleWrap(str) {
    return "```".concat(str).concat("```");
  },
  underlineWrap(str) {
    return "__".concat(str).concat("__");
  },
  italicsWrap(str) {
    return "_".concat(str).concat("_");
  },
  spoilerWrap(str) {
    return "||".concat(str).concat("||");
  },
  redWrap(str) {
    return "```diff\n".concat(str).concat("\n```");
  },
  orangeWrap(str) {
    return "```fix\n".concat(str).concat("\n```");
  },
  greenWrap(str) {
    return "```yaml\n".concat(str).concat("\n```");
  },
  lightGreenWrap(str) {
    return "```css\n".concat(str).concat("\n```");
  },
  successEmbed(embed, description) {
    embed
      .setColor("#00d166")
      .setAuthor("✅ Success")
      .setDescription(this.boldWrap(description));
  },
  errorEmbed(embed, description) {
    embed
      .setColor("#f8c300")
      .setAuthor("⚠️ Error")
      .setDescription(this.boldWrap(description));
  },
  cooldownEmbed(embed, description) {
    embed
      .setColor("#CC7900")
      .setAuthor("⏳ Cooldown")
      .setDescription(this.boldWrap(description));
  },
  permissionEmbed(embed, description) {
    embed
      .setColor("#A62019")
      .setAuthor("🚫 Permission")
      .setDescription(this.boldWrap(description));
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

module.exports = {
  options,
};
