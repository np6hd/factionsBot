module.exports = {
  name: "token",
  description: "Verify and add the user to the whitelist",
  checkArgs: true,
  type: "ingame",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, client, username) {
    let userObj = database.removeTempToken(arguments)
    if (userObj != []) {
      database.addUser(username, userObj[0].discordTag);
      console.log(username + " has been verified");
      bot.chat(
        "/msg " +
          username +
          " You have been verified! You can now use ingame commands."
      );
    }
  },
};
