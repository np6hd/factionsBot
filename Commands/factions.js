module.exports = {
  name: "factions",
  description: "Show Factions Commands",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message, clientCommands) {
    let factionCommands = "";
    let info = options.boldWrap("Note:") + "```diff\n";
    info +=
      "- A user must be verified first\n" +
      `- Type ${options.prefix}verify in the verify channel to get started\n` +
      "- Some of the commands can be run in-game or in discord\n" +
      "- But you must be online in game, to run ingame commands in discord\n";
    info += "```\n";
    for (eachCommand of clientCommands) {
      if (eachCommand[1].category === "factions") {
        if (eachCommand[1].type != "ingame") {
          factionCommands +=
            "🔹 " + `${options.boldWrap(eachCommand[1].name + ": ")}`;
          factionCommands +=
            `${options.italicsWrap(eachCommand[1].description)}` + "\n";
        }
      }
    }
    embed
      .setColor("#00c09a")
      .setAuthor("⚔️ Faction Commands")
      .setDescription(info + factionCommands);
  },
};
