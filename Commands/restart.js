module.exports = {
  name: "restart",
  description: "Restart the mineflayer bot",
  checkArgs: false,
  type: "discord",
  category: "admin",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message) {
    embed
      .setColor("#A62019")
      .setDescription("```⚠️ Restarting bot, wait for 10 seconds```");
    bot.quit();
  },
};
