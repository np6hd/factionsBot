const bold = "**";
module.exports = {
  name: "ctop",
  description: "Show the top wall checkers",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "factions",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
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
          name: "Top Wall Checkers",
          value: users,
          inline: true,
        },
        {
          name: "Wall Checks",
          value: wallChecks,
          inline: true,
        }
      );
  },
};
