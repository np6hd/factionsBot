const bold = "**";
const underline = "__";
module.exports = {
  name: "help",
  description: "Show Categories Of Help Commands",
  checkArgs: false,
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message, clientCommands) {
    let helpCommands = "";
    helpCommands +=
      "**Information:**```Run these commands on dicord.\nCommands cooldown has been set to 10 seconds.\nNon-admin users must be verified first before using other commands.```\n";
    for (eachCommand of clientCommands) {
      if (eachCommand[1].category === "help") {
        helpCommands +=
          bold + options.prefix + eachCommand[1].name + bold + " - ";
        helpCommands += "`" + eachCommand[1].description + "`\n";
      }
    }
    embed
      .setColor("#00c09a")
      .setTitle("Help Commands")
      .setDescription(helpCommands);
  },
};
