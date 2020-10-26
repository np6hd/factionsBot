module.exports = {
  name: "tpyes",
  description: "Accept incoming/outgoing teleport request",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "admin",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat("/tpyes");
    embed.setColor("#00d166").setAuthor("✅ Accept Teleport Request");
  },
};
