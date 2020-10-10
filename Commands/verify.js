const embedWrapper = "```";
module.exports = {
  name: "verify",
  description: "Start a verification process for a user",
  checkArgs: false,
  type: "discord",
  usesChat: false,
  sendEmbed: false,
  usesShield: false,
  execute(bot, database, arguments, options, embed, message) {
    if (database.isVerified(message.author.tag)) {
      message.author.send("You have already been verified.");
      return;
    }
    let author = `${message.author}`;
    message.channel.send(
      author +
        " You are almost verified. Read the direct message sent to you to verify."
    );

    const newToken = database.createTempToken(message.author.tag);

    embed
      .setColor("#0099ff")
      .setTitle("Verifying Token")
      .setDescription(
        embedWrapper +
          "Copy and paste the following command in game to become a verified user: " +
          ".token " +
          newToken +
          embedWrapper
      );
    message.author.send(embed);
  },
};
