module.exports = {
  name: "checked",
  description: "If User is verified, mark walls checked or show cool down",
  checkArgs: false,
  type: "ingame",
  usesChat: false,
  sendEmbed: true,
  usesShield: true,
  execute(bot, database, arguments, options, client, username) {
    let today = new Date();
    let currentTime = today.getTime();
    const userWallObject = database
      .getUserObject(username)
      .get("userWallChecks");

    if (userWallObject.get("wallChecks").value() == 0) {
      database.updateWallChecked(userWallObject, currentTime);
      bot.chat(
        "Wall has been checked by " +
          username +
          ". " +
          username +
          ", has total: 1 wall checks"
      );
    } else {
      let coolDown = Math.abs(
        (currentTime - userWallObject.get("lastWallChecked").value()) / 1000
      );
      if (coolDown > 30) {
        database.updateWallChecked(userWallObject, currentTime);
        bot.chat(
          "Wall has been checked by " +
            username +
            ". " +
            username +
            ", has total: " +
            userWallObject.get("wallChecks").value() +
            " wall checks"
        );
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
