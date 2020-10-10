module.exports = {
  name: "tpyes",
  description: "Accept incoming/outgoing teleport request",
  checkArgs: false,
  type: "discord",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat("/tpyes");
    embed.setColor("#cc7900").setTitle("Accept Teleport Request | " + options.host);
  },
};
