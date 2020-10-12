module.exports = (bot, database, options, channel, embed) => {
  embed.setTitle("Wall Check Interval").setColor("#f8c300");
  let today = new Date();
  let wallObj = database.getWallChecksObject();
  const timeDifference = options.getDifference(
    wallObj.get("lastWallChecked").value(),
    today.getTime()
  );
  if (timeDifference.minutes >= options.wallCheckFrequency) {
    let time = "";
    Object.keys(timeDifference).forEach((key) => {
      if (timeDifference[key] != 0) {
        if(key == "seconds") return
        if (key == "minutes") time += timeDifference[key] + " " + key + ".";
        else time += timeDifference[key] + " " + key + " ";
      }
    });
    wallObj.update("wallMinuteUnchecked", (n) => (n = time)).write();
    bot.chat(
      "Walls not checked for: " +
        wallObj.get("wallMinuteUnchecked").value() +
        `Check walls now and type (${options.prefix}checked) to clear it!`
    );
    embed.setDescription(
      "⚠️ Walls have not been checked for __" +
        wallObj.get("wallMinuteUnchecked").value() +
        "__"
    );
    channel.send(embed);
  }
};
