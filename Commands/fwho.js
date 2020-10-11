module.exports = {
  name: "fwho",
  description:
    "Run faction who command and show the factions information based on player or faction as an input ",
  checkArgs: true,
  type: "discord",
  category: "factions",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat("/f who " + arguments);
    embed.setColor("#f93a2f").setTitle("Factions Who | " + options.serverIP);
  },
};
