const bold = "**";
module.exports = {
  name: "bchecked",
  description: "If User is verified, mark buffers checked or show cool down",
  checkArgs: false,
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

    if (userWallObject.get("bufferChecks").value() == 0) {
      database.updateBufferChecked(userWallObject, currentTime);
      bot.chat(
        "Buffers have been checked by " +
          username +
          ". " +
          username +
          ", has total: 1 buffer checks"
      );
      let description = "Buffer have been checked by __" + username + "__\n";
      description += bold + username + bold + " checks: 1\n";

      embed.setDescription(description);
      bufferCheckChannel.send(embed);
    } else {
      let coolDown = Math.abs(
        (currentTime - userWallObject.get("lastBufferChecked").value()) / 1000
      );
      if (coolDown > 60) {
        database.updateBufferChecked(userWallObject, currentTime);
        bot.chat(
          "Buffers have been checked by " +
            username +
            ". " +
            username +
            ", has total: " +
            userWallObject.get("bufferChecks").value() +
            " buffer checks"
        );
        let description = "Buffer have been checked by __" + username + "__\n";
        description +=
          bold +
          username +
          bold +
          " checks: " +
          userWallObject.get("bufferChecks").value() +
          "\n";
        embed.setDescription(description);
        bufferCheckChannel.send(embed);
      } else {
        coolDown = 60 - coolDown;
        bot.chat(
          username +
            ", you are in (" +
            coolDown.toFixed(2) +
            ") seconds cooldown."
        );
      }
    }
  },
};
