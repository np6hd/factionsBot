const bold = "**";
const embedWrapper = "```";
module.exports = {
  name: "weewoo",
  description: "Tag everyone to alert them of a possbile raid",
  checkArgs: true,
  arguments: "<north/west/south/east>",
  type: "ingame",
  category: "factions",
  usesChat: false,
  sendEmbed: true,
  usesShield: true,
  adminPerms: false,
  execute(bot, database, arguments, options, client, username, embed) {
    arguments = arguments.toLowerCase();
    if (
      arguments == "north" ||
      arguments == "south" ||
      arguments == "west" ||
      arguments == "east"
    ) {
      let channel = client.channels.cache.find(
        (channel) => channel.id === database.getChannelID(this.name)
      );
      if (channel != undefined) {
        let newDescription =
          "@everyone" +
          embedWrapper +
          "WE ARE BEING RAIDED FROM THE " +
          arguments.toUpperCase() +
          " SIDE" +
          "\nGET ON NOW WE ARE BEING RAIDED" +
          embedWrapper +
          bold +
          "\nTRIGGERED BY: " +
          bold +
          username +
          bold +
          "\nDIRECTION: " +
          bold +
          arguments.toUpperCase() +
          "\n";
        let getDiscordTag = database
          .getUserObject(username)
          .get("discordTag")
          .value();
        embed
          .setDescription(newDescription)
          .setColor("#f93a2f")
          .setTitle("WE ARE BEING RAIDED! HELP!")
          .setThumbnail(options.tnturl)
          .setAuthor("WEEWOO ", options.tnturl)
          .setFooter(getDiscordTag, options.url + bot.players[username].uuid);
        bot.chat(
          "Alert! We are being raided from the " +
            arguments.toUpperCase() +
            " side"
        );

        for (var i = 0; i < 3; i++) {
          channel.send(embed);
        }
      } else {
        bot.chat("Error: weewoo channel has not been setup");
      }
    } else {
      bot.chat("Error: Wrong Syntax, type: .weewoo <north/west/south/east>");
    }
  },
};
