const bold = "**";

module.exports = {
  name: "resetdb",
  description: "Reset the database for new map/season",
  checkArgs: false,
  type: "discord",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  execute(bot, database, arguments, options, client, username, embed) {
    database.resetDatabase()
    embed.setColor("#a62019").addDescription("Database has been reset, everyone needs to verify again")
  },
};
