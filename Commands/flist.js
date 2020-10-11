module.exports = {
  name: "flist",
  description: "Run factions list command and show the current factions list",
  checkArgs: false,
  type: "discord",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat("/f list");
    embed.setColor("#a652bb").setTitle("Factions List | " + options.serverIP);
  },
};
