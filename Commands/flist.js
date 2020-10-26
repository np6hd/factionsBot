module.exports = {
  name: "flist",
  description: "Run factions list command and show the current factions list",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "factions",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat("/f list");
    embed.setColor("#a652bb").setAuthor("📄 Factions List");
  },
};
