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
    if (usersObject.length == 0) {
      options.errorEmbed(embed, "There is not enough user data.");
      return;
    }
    for (eachUser of usersObject) {
      users += `${count}. ${eachUser.username}\n`;
      wallChecks += `${eachUser.userWallChecks.wallChecks}\n`;
      count += 1;
    }
    embed.setColor("#00C09A").setAuthor("🏅 Top Wall Checkers").addFields(
      {
        name: "Wall Checker",
        value: users,
        inline: true,
      },
      {
        name: "Checks",
        value: wallChecks,
        inline: true,
      }
    );
  },
};
