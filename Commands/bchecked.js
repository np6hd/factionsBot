const bold = "**";
module.exports = {
  name: "bchecked",
  description:
    "If the user is verified, mark buffers checked or show cool down",
  checkArgs: false,
  arguments: "",
  type: "ingame",
  category: "factions",
  usesChat: false,
  sendEmbed: false,
  usesShield: true,
  adminPerms: false,
  execute(bot, database, arguments, options, client, username, embed) {
    const bufferCheckChannel = client.channels.cache.find(
      (channel) => channel.id === database.getChannelID("bufferchecks")
    );

    if (bufferCheckChannel == undefined) {
      bot.chat("Error: Buffer check channel not setup");
      return;
    }

    let today = new Date();
    let currentTime = today.getTime();
    const userWallObject = database
      .getUserObject(username)
      .get("userWallChecks");

    embed.setColor("#00D166").setTitle("Buffer Check");

    const timeDifference = options.getDifference(
      userWallObject.get("lastBufferChecked").value(),
      today.getTime()
    );
    if (timeDifference.minutes >= 1) {
      database.updateBufferChecked(userWallObject, currentTime);
      bot.chat(
        "Buffers checked by " +
          username +
          ", with total: " +
          userWallObject.get("bufferChecks").value() +
          " buffer checks"
      );
      let description = "Buffers have been checked by __" + username + "__\n";
      description +=
        bold +
        username +
        " checks: " +
        bold +
        userWallObject.get("bufferChecks").value() +
        "\n";
      embed.setDescription(description);
      bufferCheckChannel.send(embed);
    } else {
      let coolDown = 60 - timeDifference.seconds;
      bot.chat(
        username +
          ", you are in (" +
          coolDown.toFixed(2) +
          ") seconds cooldown."
      );
    }
  },
};
