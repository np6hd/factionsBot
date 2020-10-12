const { setChannelArgs } = require("../utils/config");
const embedWrapper = "```";
module.exports = {
  name: "set",
  description: "Show Channel Setup Commands",
  checkArgs: false,
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message) {
    if (!arguments) {
      let description = "";
      description +=
        `**Syntax:** ${embedWrapper}${options.prefix}set <name> <#serverchannel>${embedWrapper}\n` +
        `**Example**: ${embedWrapper}${options.prefix}set announcements #announcements${embedWrapper}\n`;
      for (eachArgs of setChannelArgs) {
        let getID = database.getChannelID(eachArgs);
        let channel = message.client.channels.cache.find(
          (channel) => channel.id === getID
        );
        description += "**" + eachArgs + "** - ";
        if (channel == undefined) {
          description += "`Channel Not Set`\n";
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
      if (setChannelArgs.includes(splitArgs[0])) {
        let channel = message.client.channels.cache.find(
          (channel) => channel.id === database.getChannelID(splitArgs[0])
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
          embed.setDescription(
            `✅ Set ${splitArgs[0]} channel to ${splitArgs[1]}`
          );
        }
      } else {
        embed
          .setDescription(
            `${embedWrapper}❗ Error, type the correct syntax: ${options.prefix}set <channel> <#channeltag>`
          )
          .setFooter("<> = required, [] = optional");
      }
    }
  },
};
