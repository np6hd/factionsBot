module.exports = {
  name: "resetdb",
  description: "Reset the database for new map/season",
  checkArgs: false,
  type: "discord",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  execute(bot, database, arguments, options, embed, message) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      embed.setDescription(
        "```❌ You do not have permissions to run this command```"
      );
      return;
    }
    database.resetDatabase();
    embed
      .setColor("#a62019")
      .setTitle("Database Reset")
      .setDescription(
        "Database has been reset, everyone needs to verify again, type __.set__ to setup channels again"
      );
  },
};
