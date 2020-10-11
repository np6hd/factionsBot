const bold = "**";
const underline = "__";
module.exports = {
  name: "admin",
  description:
    "Show all the current avaiable commands relating to administration",
  checkArgs: false,
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message, clientCommands) {
    let adminCommands = "";
    for (eachCommand of clientCommands) {
      if (eachCommand[1].category === "admin") {
        adminCommands +=
          bold + options.prefix + eachCommand[1].name + bold + " - ";
        adminCommands +=
          underline + eachCommand[1].description + underline + "\n";
      }
    }
    embed
      .setColor("#00c09a")
      .setTitle("Admin Commands:")
      .setDescription(adminCommands);
  },
};
