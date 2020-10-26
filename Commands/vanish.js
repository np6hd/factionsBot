module.exports = {
  name: "vanish",
  description: "Check all vanished staffs",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "factions",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    let vanished = [];
    let count = 0;
    bot.tabComplete(`/tell `, (data, players) => {
      for (eachPlayer of players) {
        if (bot.players[eachPlayer] == undefined) {
          if (eachPlayer != "*" && eachPlayer != "**") {
            vanished.push(options.singleWrap(eachPlayer));
            count++;
          }
        }
      }
      if (vanished.length != 0) {
        embed.setDescription(vanished.join(", "));
      } else embed.setDescription("No vanished players");
      embed
        .setColor("#0099E1")
        .setAuthor("🙊 Vanish")
        .setTitle(
          "Total: " + options.underlineWrap(count) + " vanished staffs"
        );
    });
  },
};
