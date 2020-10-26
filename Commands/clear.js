module.exports = {
  name: "clear",
  description: "Clear the weewoo",
  checkArgs: false,
  arguments: "",
  type: "both",
  category: "factions",
  usesChat: false,
  sendEmbed: false,
  usesShield: true,
  adminPerms: false,
  execute(
    bot,
    database,
    arguments,
    options,
    embed,
    message,
    clientCommands,
    client,
    username
  ) {
    const channel = client.channels.cache.find(
      (channel) => channel.id === database.getChannelID("weewoo")
    );
    if (channel == undefined) {
      if (message != "") {
        options.errorEmbed(embed, "WeeWoo channel is not setup");
        message.channel.send(embed);
      }
      bot.chat("Error: WeeWoo channel is not setup");
      return;
    }

    let getDiscordTag = "";

    if (username == "") {
      if (message.channel.id != database.getChannelID("weewoo")) {
        options.errorEmbed(embed, "Type this in the WeeWoo channel");
        message.channel.send(embed);
        return;
      }

      username = database.getDiscordUserObject(message.author.tag).value();

      if (username == undefined) {
        options.errorEmbed(
          embed,
          "You have not verified yourself with the bot."
        );
        message.channel.send(embed);
        return;
      }

      username = username.username;

      if (bot.players[username] == undefined) {
        options.errorEmbed(
          embed,
          "You have to be online in game to run this command in discord."
        );

        message.channel.send(embed);
        return;
      }
      getDiscordTag = message.author.tag;
    } else {
      getDiscordTag = database
        .getUserObject(username)
        .get("discordTag")
        .value();
    }

    let newDescriptions = options.boldWrap("Cleared by: ") + username + "\n";
    embed
      .setColor("#00D166")
      .setAuthor("✅ Cleared Walls")
      .setTitle("We are no longer being raided.")
      .setFooter(getDiscordTag, options.urls.uuid + bot.players[username].uuid)
      .setThumbnail(options.urls.uuid + bot.players[username].uuid)
      .setDescription(newDescriptions);
    bot.chat("WeeWoo: Cleared by, " + username + ".");
    channel.send(embed);
  },
};
