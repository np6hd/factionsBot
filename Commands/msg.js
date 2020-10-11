module.exports = {
  name: "msg",
  description: "Message a user with provided arguments",
  checkArgs: true,
  type: "discord",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat("/msg " + arguments);
    embed.setColor("#59768d").setTitle("Message User | " + options.serverIP);
  },
};
