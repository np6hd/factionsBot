module.exports = {
  name: "shield",
  description: "Turn on/off wall check operations",
  checkArgs: true,
  arguments: "<on/off>",
  type: "discord",
  category: "admin",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message) {
    let wallChannel = message.guild.channels.cache.find(
      (ch) => ch.id === database.getChannelID("wallchecks")
    );

    let bufferChannel = message.guild.channels.cache.find(
      (ch) => ch.id === database.getChannelID("bufferchecks")
    );

    let weeChannel = message.guild.channels.cache.find(
      (ch) => ch.id === database.getChannelID("weewoo")
    );

    let toReturn = false;
    let description = "";

    if (wallChannel == undefined) {
      description = "Wallchecks channel is not set up.\n";
      toReturn = true;
    }
    if (bufferChannel == undefined) {
      description += "Bufferchecks channel is not set up.\n";
      toReturn = true;
    }
    if (weeChannel == undefined) {
      description += "WeeWoo channel is not set up.\n";
      toReturn = true;
    }

    if (toReturn) {
      options.errorEmbed(embed, description);
      return;
    }

    if (arguments == "on") {
      if (database.isShieldOn()) {
        options.errorEmbed(embed, "Shield is already turned on.");
        return;
      }
      options.successEmbed(
        embed,
        "Shield is enabled, all wall check operations are halted."
      );
    } else if (arguments == "off") {
      if (!database.isShieldOn()) {
        options.errorEmbed(embed, "Shield is already off.");
        return;
      }
      options.successEmbed(
        embed,
        "Shield is disabled, all wall check operations are resumed."
      );
    } else {
      options
        .errorEmbed(
          embed,
          `${options.boldWrap("Syntax:") + options.tripleWrap(
            options.prefix + this.name + " " + this.arguments + "\n"
          )}`
        )
        embed.setFooter("<> = required, [] = optional");
      return;
    }
    database.toggleShield();
  },
};
