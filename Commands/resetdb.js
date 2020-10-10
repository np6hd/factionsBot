const bold = "**";

module.exports = {
  name: "resetdb",
  description: "Reset the database for new map/season",
  checkArgs: false,
  type: "discord",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  execute(bot, database, arguments, options, embed, message) {
    database.resetDatabase();
    embed
      .setColor("#a62019")
      .setTitle("Database Reset")
      .setDescription(
        "Database has been reset, everyone needs to verify again, type \__.setup\__ to enable channels again"
      );
  },
};
