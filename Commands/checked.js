const bold = "**";
module.exports = {
  name: "checked",
  description: "If the user is verified, mark walls checked or show cool down",
  checkArgs: false,
  arguments: "",
  type: "ingame",
  category: "factions",
  usesChat: false,
  sendEmbed: true,
  usesShield: true,
  adminPerms: false,
  execute(bot, database, arguments, options, client, username, embed) {
    const wallCheckChannel = client.channels.cache.find(
      (channel) => channel.id === database.getChannelID("wallchecks")
    );

    if (wallCheckChannel == undefined) {
      bot.chat("Error: Wall check channel not setup");
      return;
    }

    embed.setColor("#00D166").setTitle("Wall Check");

    let today = new Date();
    let currentTime = today.getTime();
    const userWallObject = database
      .getUserObject(username)
      .get("userWallChecks");

    const timeDifference = options.getDifference(
      userWallObject.get("lastWallChecked").value(),
      today.getTime()
    );
    if (timeDifference.minutes >= 1) {
      database.updateWallChecked(userWallObject, currentTime);
      bot.chat(
        "Walls checked by " +
          username +
          ", with total: " +
          userWallObject.get("wallChecks").value() +
          " wall checks"
      );
      let description = "Walls have been checked by __" + username + "__\n";
      description +=
        bold +
        username +
        " checks: " +
        bold +
        userWallObject.get("wallChecks").value() +
        "\n";
      embed.setDescription(description);
      wallCheckChannel.send(embed);
    } else {
      let coolDown = 30 - timeDifference.seconds;
      bot.chat(
        username +
          ", you are in (" +
          coolDown.toFixed(2) +
          ") seconds cooldown."
      );
    }
  },
};
