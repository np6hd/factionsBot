const bold = "**";
const underline = "__";
let lineWrap = "```";
module.exports = {
  name: "help",
  description: "Show Categories Of Help Commands",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message, clientCommands) {
    let helpCommands = "";
    let information =
      "Run these commands on dicord.\n" +
      "Commands cooldown has been set to 10 seconds.\n" +
      "Non-admin users must be verified first before using other commands.\n" +
      "Setup the channels first before turning off shield / wallcheck operations.\n" +
      "Some commands require arguments, follow the syntax.";
    helpCommands += `**Information:**${lineWrap}${information}${lineWrap}\n`;
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
