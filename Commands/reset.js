module.exports = {
  name: "reset",
  description: "Reset everything for new map/season (channels are not reset)",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "admin",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message) {
    database.resetDatabase();
    options.successEmbed(
      embed,
      "Everything has been reset except for channels"
    );
  },
};
