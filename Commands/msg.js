module.exports = {
  name: "msg",
  description: "Message a user with provided arguments",
  checkArgs: true,
  arguments: "<user> [message]",
  type: "discord",
  category: "factions",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat("/msg " + arguments);
    embed.setColor("#59768d").setTitle("Message User | " + options.serverIP);
  },
};
