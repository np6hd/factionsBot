const bold = "**";
const underline = "__";
module.exports = {
  name: "factions",
  description: "Show all the current avaiable commands relating to factions",
  checkArgs: false,
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message, clientCommands) {
    let factionCommands = "";
    for (eachCommand of clientCommands) {
      if (eachCommand[1].category === "factions") {
        factionCommands +=
          bold + options.prefix + eachCommand[1].name + bold + " - ";
        factionCommands +=
          underline + eachCommand[1].description + underline + "\n";
      }
    }
    embed
      .setColor("#00c09a")
      .setTitle("Faction Commands:")
      .setDescription(factionCommands);
  },
};
