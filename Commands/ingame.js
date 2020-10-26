module.exports = {
  name: "ingame",
  description: "Show Ingame Commands",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(
    bot,
    database,
    arguments,
    options,
    embed,
    message,
    clientCommands,
    client,
    username
  ) {
    let info = options.boldWrap("Note:") + "```diff\n";
    info +=
      "- A user must be verified first\n" +
      `- Type ${options.prefix}verify in the verify channel to get started\n` +
      "- Some of the commands can be run in-game or in discord\n" +
      "- But you must be online in game, to run ingame commands in discord\n";
    info += "```\n";
    let ingameCommands = "";
    for (eachCommand of clientCommands) {
      if (eachCommand[1].type === "both") {
        ingameCommands +=
          "🔹 " + `${options.boldWrap(eachCommand[1].name + ": ")}`;
        ingameCommands +=
          `${options.italicsWrap(eachCommand[1].description)}` + "\n";
      }
    }
    embed
      .setColor("#00c09a")
      .setAuthor("🎮 In Game Commands")
      .setDescription(info + ingameCommands);
  },
};
