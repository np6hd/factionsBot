module.exports = {
  name: "weewoo",
  description: "Tag everyone to alert them of a possbile raid",
  checkArgs: true,
  arguments: "<north/west/south/east>",
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
    arguments = arguments.toLowerCase();
    if (
      arguments == "north" ||
      arguments == "south" ||
      arguments == "west" ||
      arguments == "east"
    ) {
      const channel = client.channels.cache.find(
        (channel) => channel.id === database.getChannelID(this.name)
      );

      if (channel == undefined) {
        if (message != "") {
          options.errorEmbed(embed, "WeeWoo channel is not setup.");
          message.channel.send(embed);
        }
        bot.chat("Error: WeeWoo channel is not setup.");
        return;
      }

      let getDiscordTag = "";

      if (username == "") {
        if (message.channel.id != database.getChannelID("weewoo")) {
          options.errorEmbed(embed, "Type this in the WeeWoo channel.");
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

      embed
        .addFields(
          { name: "TRIGERED BY:", value: username },
          {
            name: "DIRECTION:",
            value: arguments.toUpperCase(),
          }
        )
        .setColor("#f93a2f")
        .setTitle("WE ARE BEING RAIDED! HELP!")
        .setThumbnail(options.urls.tnt)
        .setAuthor("WEEWOO", options.urls.tnt)
        .setFooter(
          getDiscordTag,
          options.urls.uuid + bot.players[username].uuid
        );
      bot.chat(
        "WeeWoo: We are being raided from the " +
          arguments.toUpperCase() +
          " side."
      );

      for (var i = 0; i < 3; i++) {
        channel.send(embed);
        channel.send(options.spoilerWrap("@everyone"));
      }
    } else {
      if (message != "") {
        options.errorEmbed(
          embed,
          options.boldWrap("Syntax:") +
            options.tripleWrap(
              `${options.prefix}weewoo <north/west/south/east>`
            )
        );
        message.channel.send(embed);
        return;
      }
      bot.chat(
        `Error: Wrong Syntax, type - ${options.prefix}weewoo <north/west/south/east>`
      );
    }
  },
};
