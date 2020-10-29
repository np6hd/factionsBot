module.exports = {
  name: "bchecked",
  description:
    "If the user is verified, mark buffers checked or show cool down",
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
    const bufferCheckChannel = client.channels.cache.find(
      (channel) => channel.id === database.getChannelID("bufferchecks")
    );

    if (bufferCheckChannel == undefined) {
      if (message != "") {
        options.errorEmbed(embed, "Bufferchecks channel is not setup.");
        message.channel.send(embed);
      }
      bot.chat("Error: Bufferchecks channel is not setup.");
      return;
    }

    if (username == "") {
      if (message.channel.id != database.getChannelID("bufferchecks")) {
        options.errorEmbed(embed, "Type this in the Bufferchecks channel.");
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
    }

    let today = new Date();
    let currentTime = today.getTime();

    let userWallObject = database.getUserObject(username);

    embed
      .setColor("#00D166")
      .setAuthor("✅ Buffer Check")
      .setThumbnail(options.urls.uuid + bot.players[username].uuid);

    userWallObject = userWallObject.get("userWallChecks");

    const timeDifference = options.getDifference(
      userWallObject.value().lastBufferChecked,
      currentTime
    );
    if (timeDifference.minutes >= 1) {
      database.updateBufferChecked(userWallObject, currentTime);
      bot.chat(
        "Buffers: Checked by " +
          username +
          ", who has total - " +
          userWallObject.get("bufferChecks").value() +
          " buffer checks."
      );
      embed.addFields(
        { name: "Buffers have been checked by:", value: username },
        {
          name: "Total Checks:",
          value: userWallObject.get("bufferChecks").value(),
        }
      );
    } else {
      let coolDown = Math.abs(60 - timeDifference.seconds);
      options.cooldownEmbed(
        embed,
        username + ", you are in a " + coolDown.toFixed(2) + " second cooldown."
      );
      bot.chat(
        username + ", you are in a " + coolDown.toFixed(2) + " second cooldown."
      );
    }
    bufferCheckChannel.send(embed);
  },
};
