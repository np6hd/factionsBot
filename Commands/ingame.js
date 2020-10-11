const bold = "**";
const underline = "__";
module.exports = {
  name: "ingame",
  description: "Show all the current avaiable commands used in game",
  checkArgs: false,
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message, clientCommands) {
    let ingameCommands = "";
    for (eachCommand of clientCommands) {
      if (eachCommand[1].type === "ingame") {
        ingameCommands +=
          bold + options.prefix + eachCommand[1].name + bold + " - ";
        ingameCommands +=
          underline + eachCommand[1].description + underline + "\n";
      }
    }
    embed
      .setColor("#00c09a")
      .setTitle("In game commands:")
      .setDescription(ingameCommands);
  },
};
