module.exports = {
  name: "resetchannels",
  description: "Reset channels, you need to setup the channels again",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "admin",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message) {
    database.resetChannels();
    options.successEmbed(
      embed,
      "Channels have been reset, you need to setup channels again."
    );
  },
};
