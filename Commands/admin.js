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
    let info = `${options.boldWrap("Note:")}`;
    info += "```diff\n";
    info +=
      "- These commands require you to have ADMINISTRATOR level of permissions";
    info += "```\n";
    let adminCommands = "";
    //options.tripleWrap("Run these commands on dicord") + "\n";
    for (eachCommand of clientCommands) {
      if (eachCommand[1].category === "admin") {
        adminCommands += "🔹 " +
          options.boldWrap(eachCommand[1].name) + ": ";
        adminCommands +=
          options.italicsWrap(eachCommand[1].description) + "\n";
      }
    }
    embed
      .setColor("#00c09a")
      .setAuthor("🛡️ Admin Commands")
      .setDescription(info + adminCommands);
  },
};
