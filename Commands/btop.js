const bold = "**";

module.exports = {
  name: "btop",
  description: "Show the top buffer checkers",
  checkArgs: false,
  type: "discord",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  execute(bot, database, arguments, options, embed, message) {
    let users = "";
    let bufferChecks = "";
    let count = 1;
    const usersObject = database
      .getAllUsersObject()
      .orderBy("userWallChecks.bufferChecks", "desc")
      .value();
    for (eachUser of usersObject) {
      users += `${count}. ${eachUser.username}\n`;
      bufferChecks += `${eachUser.userWallChecks.bufferChecks}\n`;
      count += 1;
    }
    embed
      .setColor("#f8c300")
      .setTitle("Buffer Check Top | " + options.serverIP)
      .addFields(
        {
          name: bold + "Top Buffer Checkers" + bold,
          value: users,
          inline: true,
        },
        {
          name: bold + "Buffer Checks" + bold,
          value: bufferChecks,
          inline: true,
        }
      );
  },
};
