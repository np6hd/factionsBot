const bold = "**";
module.exports = {
  name: "ctop",
  description: "Show the top wall checkers",
  checkArgs: false,
  type: "discord",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  execute(bot, database, arguments, options, embed, message) {
    let users = "";
    let wallChecks = "";
    let count = 1;
    const usersObject = database
      .getAllUsersObject()
      .orderBy("userWallChecks.wallChecks", "desc")
      .value();
    for (eachUser of usersObject) {
      users += `${count}. ${eachUser.username}\n`;
      wallChecks += `${eachUser.userWallChecks.wallChecks}\n`;
      count += 1;
    }
    embed
      .setColor("#f8c300")
      .setTitle("Wall Check Top | " + options.serverIP)
      .addFields(
        {
          name: bold + "Top Wall Checkers" + bold,
          value: users,
          inline: true,
        },
        {
          name: bold + "Wall Checks" + bold,
          value: wallChecks,
          inline: true,
        }
      );
  },
};
