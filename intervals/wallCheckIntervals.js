module.exports = (bot, database, options, channel, embed) => {
  embed.setTitle("Wall Check Interval").setColor("#f8c300");
  let today = new Date();
  let wallObj = database.getWallChecksObject();
  const timeDifference = options.getDifference(
    wallObj.get("lastWallChecked").value(),
    today.getTime()
  );
  if (timeDifference.minutes >= database.getTime("auto_wallcheck")) {
    let time = "";
    Object.keys(timeDifference).forEach((key) => {
      if (timeDifference[key] != 0) {
        if (key == "seconds") return;
        if (key == "minutes") time += timeDifference[key] + " " + key + ". ";
        else time += timeDifference[key] + " " + key + " ";
      }
    });
    wallObj.update("wallMinuteUnchecked", (n) => (n = time)).write();
    bot.chat(
      "Walls: not checked for " +
        time +
        "Check walls now and type " +
        options.prefix +
        "checked to clear it!"
    );
    embed.setDescription("⚠️ Walls have not been checked for __" + time + "__");
    channel.send(embed).then(() => {
      if(timeDifference.minutes >= database.getTime("ping_walls_unchecked_after")) channel.send("@everyone").then(msg => msg.delete());
    });
  }
};
