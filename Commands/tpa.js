module.exports = {
  name: "tpa",
  description: "Send a teleport request to a player",
  checkArgs: true,
  type: "discord",
  category: "admin",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat("/tpa " + arguments);
    embed.setColor("#cc7900").setTitle("Request to Teleport | " + options.host);
  },
};
