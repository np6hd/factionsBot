module.exports = (bot, database, options) => {
  let today = new Date();
  let wallObj = database.getBufferChecksObject();
  let timeDifference = Math.abs(
    (today.getTime() - wallObj.get("lastBufferChecked").value()) / 1000
  );
  if (timeDifference / 60 > options.bufferCheckFrequency) {
    wallObj
      .update(
        "bufferMinuteUnchecked",
        (n) => (n += options.bufferCheckFrequency)
      )
      .write();
    bot.chat(
      "Buffers have not been checked for " +
        wallObj.get("bufferMinuteUnchecked").value() +
        " minutes. Check buffers now and type (.bchecked) to clear it!"
    );
  }
};
