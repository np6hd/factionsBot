module.exports = {
  name: "token",
  description:
    "User needs to run verify command first and token command with given token should be run in game",
  checkArgs: false,
  arguments: "<token number>",
  type: "ingame",
  category: "factions",
  usesChat: true,
  sendEmbed: false,
  usesShield: false,
  adminPerms: false,
  execute(
    bot,
    database,
    arguments,
    options,
    embed,
    message,
    clientCommands,
    client,
    username
  ) {
    const channel = client.channels.cache.find(
      (channel) => channel.id === database.getChannelID("verify")
    );

    if (channel == undefined) {
      bot.chat("Error: Verify channel is not setup.");
      return;
    }

    let userObj = database.removeTempToken(arguments);
    if (userObj != []) {
      database.addUser(username, userObj[0].discordTag);
      bot.chat(
        "/msg " +
          username +
          " You have been verified! You can now use ingame commands."
      );
      options.successEmbed(
        embed, `${userObj[0].discordTag}` + ", has been verified."
      )
      channel.send(embed);
    }
  },
};
