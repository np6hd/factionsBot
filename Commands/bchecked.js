module.exports = {
  name: "bchecked",
  description: "If User is verified, mark buffers checked or show cool down",
  checkArgs: false,
  type: "ingame",
  usesChat: false,
  sendEmbed: true,
  usesShield: true,
  execute(bot, database, arguments, options, client, username, embed) {
    let today = new Date();
    let currentTime = today.getTime();
    const userWallObject = database
      .getUserObject(username)
      .get("userWallChecks");

    if (userWallObject.get("bufferChecks").value() == 0) {
      database.updateBufferChecked(userWallObject, currentTime);
      bot.chat(
        "Buffer has been checked by " +
          username +
          ". " +
          username +
          ", has total: 1 buffer checks"
      );
    } else {
      let coolDown = Math.abs(
        (currentTime - userWallObject.get("lastBufferChecked").value()) / 1000
      );
      if (coolDown > 60) {
        database.updateBufferChecked(userWallObject, currentTime);
        bot.chat(
          "Wall has been checked by " +
            username +
            ". " +
            username +
            ", has total: " +
            userWallObject.get("bufferChecks").value() +
            " buffer checks"
        );
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
