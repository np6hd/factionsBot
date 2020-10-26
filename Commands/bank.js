module.exports = {
  name: "bank",
  description: "Turn on/off bank tracking",
  checkArgs: true,
  arguments: "<on/off>",
  type: "discord",
  category: "admin",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message) {
    const channel = message.guild.channels.cache.find(
      (ch) => ch.id === database.getChannelID("bank")
    );

    if (channel != undefined) {
      if (arguments == "on") {
        if (database.isTrackingMoney()) {
          options.errorEmbed(embed, "Bank tracking is already turned on.");
          return;
        }
        options.successEmbed(
          embed,
          "Bank tracking withdrawl/deposits is turned on."
        );
      } else if (arguments == "off") {
        if (!database.isTrackingMoney()) {
          options.errorEmbed(embed, "Bank tracking is already turned off.");
          return;
        }
        options.successEmbed(
          embed,
          "Bank tracking withdrawl/deposits is turned off."
        );
      } else {
        let error = `${options.boldWrap("Syntax:")}${options.tripleWrap(
          options.prefix + this.name + " " + this.arguments
        )}`;
        embed
          .setColor("#f8c300")
          .setAuthor("⚠️ Error")
          .setDescription(error)
          .setFooter("<> = required, [] = optional");
        return;
      }
      database.toggleTrackMoney();
    } else {
      options.errorEmbed(embed, "Bank channel is not setup.");
    }
  },
};
