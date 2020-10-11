const { setChannelArgs } = require("../utils/config");
module.exports = {
  name: "set",
  description: "Create all the channels",
  checkArgs: false,
  type: "discord",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message) {
    if (!arguments) {
      let description = "";
      description +=
        "**Syntax:** ```.set <name> <#serverchannel>```\n" +
        "**Example**: ```.set announcements #announcements```\n";
      for (eachArgs of setChannelArgs) {
        let getID = database.getChannelID(eachArgs.name);
        let channel = message.client.channels.cache.find(
          (channel) => channel.id === getID
        );
        description += "**" + eachArgs.name + "** - ";
        if (channel == undefined) {
          description += "Channel not set\n";
        } else {
          description += "<#" + getID + ">\n";
        }
      }
      embed
        .setColor("#00D166")
        .setTitle("Channel Settings")
        .setDescription(description);
    } else {
      let splitArgs = arguments.split(" ");
      for (eachArgs of setChannelArgs) {
        if (eachArgs.name == splitArgs[0]) {
          let channel = message.client.channels.cache.find(
            (channel) => channel.id === database.getChannelID(eachArgs.name)
          );
          if (channel != undefined)
            embed.setDescription(
              `❌ ${splitArgs[0].toUpperCase()} has already been set`
            );
          else {
            database.setChannel(
              splitArgs[0],
              splitArgs[1].replace(/[^a-zA-Z0-9]/g, "")
            );
            embed.setDescription(`✅ Set ${splitArgs[0]} channel to ${splitArgs[1]}`);
          }
        }
      }
    }
  },
};
