module.exports = {
  name: "resetdb",
  description: "Reset the database for new map/season",
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
    embed
      .setColor("#a62019")
      .setDescription(
        "```Database has been reset, everyone needs to verify and channels need be setup again```"
      );
  },
};
