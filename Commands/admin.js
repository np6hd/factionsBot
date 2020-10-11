const bold = "**";
module.exports = {
  name: "admin",
  description: "Show Administrative Commands",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message, clientCommands) {
    let adminCommands = "";
    adminCommands += "**Information:**```Run these commands on dicord```\n";
    for (eachCommand of clientCommands) {
      if (eachCommand[1].category === "admin") {
        adminCommands +=
          bold + options.prefix + eachCommand[1].name + bold + " - ";
        adminCommands +=
          "`" + eachCommand[1].description + "`\n";
      }
    }
    embed
      .setColor("#00c09a")
      .setTitle("Admin Commands")
      .setDescription(adminCommands);
  },
};
