module.exports = {
  name: "verify",
  description: "Start A Verification Process For A User",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: false,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    let verifyChannel = message.guild.channels.cache.find(
      (ch) => ch.id === database.getChannelID("verify")
    );
    if (verifyChannel == undefined) {
      options.errorEmbed(embed, "Verify channel is not setup.");
      message.channel.send(embed);
      return;
    }

    if (message.channel.id != database.getChannelID("verify")) {
      options.errorEmbed(embed, "Type this in the verify channel.");
      message.channel.send(embed);
      return;
    }

    if (database.isVerified(message.author.tag)) {
      options.errorEmbed(embed, "You have already been verified.");
      message.channel.send(embed);
      return;
    }

    embed.setColor("#CC7900").setAuthor("🚧 Verify").setDescription("You are almost verified.\nPlease read the direct message sent to you for the next step.")
    message.channel.send(embed);

    const newToken = database.createTempToken(message.author.tag);

    embed
      .setColor("#CC7900")
      .setAuthor("🎟️ Verifying Token")
      .setDescription(
        options.boldWrap(
          "Copy and paste the following command in-game directly to become a verified user:"
        ) + options.tripleWrap(options.prefix + "token " + newToken)
      );
    message.author.send(embed);
  },
};
