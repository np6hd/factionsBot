const bold = "**";
module.exports = {
  name: "checked",
  description: "If User is verified, mark walls checked or show cool down",
  checkArgs: false,
  type: "ingame",
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

    if (userWallObject.get("wallChecks").value() == 0) {
      database.updateWallChecked(userWallObject, currentTime);
      bot.chat(
        "Walls have been checked by " +
          username +
          ". " +
          username +
          ", has total: 1 wall checks"
      );
      let description = "Walls have been checked by __" + username + "__\n";
      description += bold + username + bold + " checks: 1\n";

      embed.setDescription(description);
      wallCheckChannel.send(embed);
    } else {
      let coolDown = Math.abs(
        (currentTime - userWallObject.get("lastWallChecked").value()) / 1000
      );
      if (coolDown > 30) {
        database.updateWallChecked(userWallObject, currentTime);
        bot.chat(
          "Walls have been checked by " +
            username +
            ". " +
            username +
            ", has total: " +
            userWallObject.get("wallChecks").value() +
            " wall checks"
        );
        let description = "Walls has been checked by __" + username + "__\n";
        description +=
          bold +
          username +
          bold +
          " checks: " +
          userWallObject.get("wallChecks").value() +
          "\n";
        embed.setDescription(description);
        wallCheckChannel.send(embed);
      } else {
        coolDown = 30 - coolDown;
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
