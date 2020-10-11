const bold = "**";
let embedWrapper = "```";
const underline = "__";
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
  execute(bot, database, arguments, options, embed, message, clientCommands) {
    let ingameCommands = "";
    ingameCommands += `**Info**: ${embedWrapper}A user must be verified first\nType ${options.prefix}verify in the #verify channel to get started ${embedWrapper}\n`;
    for (eachCommand of clientCommands) {
      if (eachCommand[1].type === "ingame") {
        ingameCommands +=
          bold + options.prefix + eachCommand[1].name + bold + " - ";
        ingameCommands += "`" + eachCommand[1].description + "`\n";
      }
    }
    embed
      .setColor("#00c09a")
      .setTitle("In Game Commands")
      .setDescription(ingameCommands);
  },
};
