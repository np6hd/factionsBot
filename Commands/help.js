const pagination = require("discord.js-pagination");
const discord = require("discord.js");
module.exports = {
  name: "help",
  description: "Show Categories Of Help Commands",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: false,
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
    let helpCommands = "";
    let adminCommands = "";
    let factionCommands = "";
    let ingameCommands = "";
    for (eachCommand of clientCommands) {
      if (eachCommand[1].category === "admin") {
        adminCommands += "🔹 " + options.boldWrap(eachCommand[1].name + ":  ");
        adminCommands += options.italicsWrap(eachCommand[1].description) + "\n";
      } else if (eachCommand[1].category === "factions") {
        if (eachCommand[1].type != "ingame") {
          factionCommands +=
            "🔹 " + `${options.boldWrap(eachCommand[1].name + ":  ")}`;
          factionCommands +=
            `${options.italicsWrap(eachCommand[1].description)}` + "\n";
        }
      } else if (eachCommand[1].category === "help") {
        helpCommands +=
          "🔹 " + `${options.boldWrap(eachCommand[1].name + ":  ")}`;
        helpCommands +=
          `${options.italicsWrap(eachCommand[1].description)}` + "\n";
      }
      if (eachCommand[1].type === "both") {
        ingameCommands +=
          "🔹 " + `${options.boldWrap(eachCommand[1].name + ":  ")}`;
        ingameCommands +=
          `${options.italicsWrap(eachCommand[1].description)}` + "\n";
      }
    }

    let miscEmbed = new discord.MessageEmbed();
    let miscInfo = options.boldWrap("Note:");
    miscInfo += options.redWrap(
      "- First, set the joinCommand and then restart the bot\n" +
        "- Commands cooldown has been set to 10 seconds for non-administrators\n" +
        "- Non-admin users must be verified first before using other commands\n" +
        "- Setup the channels first before turning off shield / wallcheck operations\n" +
        "- Some commands require arguments, follow the syntax\n" +
        "- Some commands can be run in discord or in game\n" +
        "- But you must be online in game, to run ingame commands in discord\n"
    );
    miscEmbed
      .setAuthor("🛈 Help Commands")
      .setColor("DARK_BLUE")
      .setDescription(miscInfo)
      .addFields({ name: "Commands", value: helpCommands, inline: true });

    let adminEmbed = new discord.MessageEmbed();
    let adminInfo = options.redWrap(
      "- These commands require you to have ADMINISTRATOR level of permissions\n"
    );
    adminEmbed
      .setAuthor("🛡️ Admin Commands")
      .setColor("DARK_BLUE")
      .setDescription(adminInfo)
      .addFields({ name: "Commands", value: adminCommands, inline: true });
    let factionEmbed = new discord.MessageEmbed();
    let factionInfo = options.redWrap(
      "- A user must be verified first\n" +
        `- Type ${options.prefix}verify in the verify channel to get started\n` +
        "- Some of the commands can be run in-game or in discord\n" +
        "- But you must be online in game, to run ingame commands in discord"
    );
    factionEmbed
      .setAuthor("⚔️ Faction Commands")
      .setColor("DARK_BLUE")
      .setDescription(factionInfo)
      .addFields({ name: "Commands", value: factionCommands, inline: true });
    let ingameEmbed = new discord.MessageEmbed();
    let ingameInfo = options.redWrap(
      "- A user must be verified first\n" +
        `- Type ${options.prefix}verify in the verify channel to get started\n` +
        "- Some of the commands can be run in-game or in discord\n" +
        "- But you must be online in game, to run ingame commands in discord\n"
    );
    ingameEmbed
      .setAuthor("🎮 In Game Commands")
      .setColor("DARK_BLUE")
      .setDescription(ingameInfo)
      .addFields({ name: "Commands", value: ingameCommands, inline: true });
    let pages = [miscEmbed, adminEmbed, factionEmbed, ingameEmbed];

    pagination(message, pages);
  },
};
