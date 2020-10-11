const bold = "**";
const underline = "__";
module.exports = {
  name: "factions",
  description: "Show Factions Commands",
  checkArgs: false,
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message, clientCommands) {
    let factionCommands = "";
    factionCommands += "**Info:**```Run these commands on dicord\nUser must be verified first to run faction commands```\n"
    for (eachCommand of clientCommands) {
      if (eachCommand[1].category === "factions") {
        if (eachCommand[1].type === "discord") {
          factionCommands +=
            bold + options.prefix + eachCommand[1].name + bold + " - ";
          factionCommands +=
            "`" + eachCommand[1].description + "`\n";
        }
      }
    }
    embed
      .setColor("#00c09a")
      .setTitle("Faction Commands")
      .setDescription(factionCommands);
  },
};
