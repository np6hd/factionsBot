module.exports = {
  name: "sendmsg",
  description: "Send a message through discord",
  checkArgs: true,
  arguments: "<message>",
  type: "discord",
  category: "factions",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat(message.author.tag + ": " + arguments);
    embed
      .setColor("#59768d")
      .setTitle("Message Sent | " + options.serverIP)
      .setDescription("```" + arguments + "```");
  },
};
