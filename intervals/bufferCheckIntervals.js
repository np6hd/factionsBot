module.exports = (bot, database, options, channel, embed) => {
  embed.setTitle("Buffer Check Interval").setColor("#f8c300");
  let today = new Date();
  let wallObj = database.getBufferChecksObject();
  const timeDifference = options.getDifference(
    wallObj.get("lastBufferChecked").value(),
    today.getTime()
  );
  if (timeDifference.minutes >= options.bufferCheckFrequency) {
    let time = "";
    Object.keys(timeDifference).forEach((key) => {
      if (timeDifference[key] != 0) {
        if (key == "seconds") return;
        if (key == "minutes") time += timeDifference[key] + " " + key + ".";
        else time += timeDifference[key] + " " + key + " ";
      }
    });
    wallObj.update("bufferMinuteUnchecked", (n) => (n = time)).write();
    bot.chat(
      "Buffers not checked for: " +
        wallObj.get("bufferMinuteUnchecked").value() +
        `Check buffers now and type (${options.prefix}bchecked) to clear it!`
    );
    embed.setDescription(
      "⚠️ Buffers have not been checked for __" +
        wallObj.get("bufferMinuteUnchecked").value() +
        "__"
    );
    channel.send(embed);
  }
};
