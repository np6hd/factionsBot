module.exports = {
  name: "cmd",
  description: "Run normal commands with provided arguments",
  checkArgs: true,
  type: "discord",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat(arguments);
    embed.setColor("#969c9f").setTitle("Command Executed | " + options.serverIP);
  },
};
