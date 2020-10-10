module.exports = (bot, database, options) => {
  let today = new Date();
  let wallObj = database.getWallChecksObject();
  let timeDifference = Math.abs(
    (today.getTime() - wallObj.get("lastWallChecked").value()) / 1000
  );
  if (timeDifference / 60 > options.wallCheckFrequency) {
    wallObj
      .update("wallMinuteUnchecked", (n) => (n += options.wallCheckFrequency))
      .write();
    bot.chat(
      "Walls have not been checked for " +
        wallObj.get("wallMinuteUnchecked").value() +
        " minutes. Check walls now and type (.checked) to clear it!"
    );
  }
};
