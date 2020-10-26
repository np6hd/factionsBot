module.exports = {
  name: "sendmsg",
  description: "Send a message through discord",
  checkArgs: true,
  arguments: "<message>",
  type: "discord",
  category: "factions",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat(message.author.tag + ": " + arguments);
    embed
      .setColor("#00D166")
      .setAuthor("✅ Message Sent")
  },
};
