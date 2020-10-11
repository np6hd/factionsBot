module.exports = {
  name: "sendmsg",
  description: "Send a message through discord",
  checkArgs: true,
  type: "discord",
  category: "factions",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    let discordObject = database.getDiscordUserObject(message.author.tag);
    if (discordObject != undefined) {
      bot.chat(discordObject.get("discordTag").value() + ": " + arguments);
      embed.setColor("#59768d").setTitle("Message Sent | " + options.serverIP).setDescription("```" + arguments + "```");
    }
  },
};
