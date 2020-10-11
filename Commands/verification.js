let bold = "**";
module.exports = {
  name: "verification",
  description: "Show Verification Commands",
  checkArgs: false,
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message, clientCommands) {
    let verificationCommands = "";
    for (eachCommand of clientCommands) {
      if (eachCommand[1].category === "verification") {
        verificationCommands +=
          bold + options.prefix + eachCommand[1].name + bold + " - ";
        verificationCommands += "`" + eachCommand[1].description + "`\n";
      }
    }
    embed
      .setColor("#00c09a")
      .setTitle("Verification")
      .setDescription(verificationCommands);
  },
};
