module.exports = {
  name: "msg",
  description: "Directly message a user with provided message",
  checkArgs: true,
  arguments: "<user> <message>",
  type: "discord",
  category: "factions",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat("/msg " + arguments);
    embed.setColor("#00D166").setAuthor("✅ Messaged User");
  },
};
