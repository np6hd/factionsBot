const embedWrapper = "```";
module.exports = {
  name: "verify",
  description: "Start a verification process for a user",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "verification",
  usesChat: false,
  sendEmbed: false,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    if (message.channel.name != this.name) {
      message.reply("Type this in the verify channel");
      return;
    }

    if (database.isVerified(message.author.tag)) {
      message.reply("You have already been verified");
      return;
    }
    let author = `${message.author}`;
    message.channel.send(
      author +
        " You are almost verified. Read the direct message sent to you to verify"
    );

    const newToken = database.createTempToken(message.author.tag);

    embed
      .setColor("#0099ff")
      .setTitle("Verifying Token")
      .setDescription(
        "**Copy and paste the following command in-game to become a verified user:** " +
          embedWrapper +
          `${options.prefix}token ` +
          newToken +
          embedWrapper
      );
    message.author.send(embed);
  },
};
