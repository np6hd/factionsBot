module.exports = {
  name: "help",
  description:
    "Show all the current avaiable commands with information pertaining to each command",
  checkArgs: false,
  type: "discord",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    embed.setColor("#00c09a")
  },
};
