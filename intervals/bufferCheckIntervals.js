module.exports = (bot, database, options, channel, embed) => {
  embed.setTitle("Buffer Check Interval").setColor("#f93a2F")
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
    embed.setDescription(
      "⚠️ Buffers have not been checked for __" +
        wallObj.get("bufferMinuteUnchecked").value() +
        "\__ minutes"
    );
    channel.send(embed);
  }
};
