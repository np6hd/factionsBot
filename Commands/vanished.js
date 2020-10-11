const { each } = require("lodash");

module.exports = {
  name: "vanished",
  description: "Check all vanished staffs",
  checkArgs: false,
  type: "discord",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    let vanished = [];
    // bot.tabComplete(`/tell `, (data, players) => {
      
    // });
    if (vanished.length != 0) {
      embed.setDescription(vanished.join(", "));
    } else embed.setDescription("No vanished players");
    embed.setColor("#969c9f").setTitle("Vanished Staff | " + options.serverIP);
  },
};
