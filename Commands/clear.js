const bold = "**";
const embedWrapper = "```";
module.exports = {
  name: "clear",
  description: "Clear the weewoo",
  checkArgs: false,
  arguments: "",
  type: "ingame",
  category: "factions",
  usesChat: false,
  sendEmbed: true,
  usesShield: true,
  adminPerms: false,
  execute(bot, database, arguments, options, client, username, embed) {
    let channel = client.channels.cache.find(
      (channel) => channel.id === database.getChannelID("weewoo")
    );
    if (channel != undefined) {
      let getDiscordTag = database
        .getUserObject(username)
        .get("discordTag")
        .value();

      let newDescriptions = bold + "Cleared by: " + bold + username + "\n";
      embed
        .setColor("#00d166")
        .setTitle("✅ Walls Are Cleared")
        .setFooter(getDiscordTag, options.url + bot.players[username].uuid)
        .setThumbnail(options.url + bot.players[username].uuid)
        .setDescription(newDescriptions);
      bot.chat("Weewoo has been cleared by, " + username);
      channel.send(embed);
    } else {
      bot.chat("Error: weewoo channel has not been setup");
    }
  },
};
