module.exports = {
  name: "restart",
  description: "Restart the bot",
  checkArgs: false,
  type: "discord",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message) {
    embed
      .setColor("#A62019")
      .setDescription("⚠️ Restarting bot, waiting for 10 seconds");
    bot.quit();
  },
};
