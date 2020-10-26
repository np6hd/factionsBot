module.exports = {
  name: "info",
  description: "Show Bot's Information Or Tag A Discord User Who Is Verified",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message, clientCommands) {
    let description = "";
    if (!arguments) {
      embed
        .setColor("#00d166")
        .setAuthor("⚙️ Bot Information")
        .addFields(
          {
            name: "Username: ",
            value: bot.player.username,
          },
          {
            name: "Latency: ",
            value: bot.player.ping,
          },
          {
            name: "Server: ",
            value: options.serverIP,
          }
        )
        .setThumbnail(options.urls.uuid + bot.player.uuid);
    } else {
      let splitArgs = arguments.split(" ");
      message.client.users
        .fetch(splitArgs[0].replace(/[^a-zA-Z0-9]/g, ""))
        .then((user) => {
          const userObj = database.getDiscordUserObject(user.tag).value();
          if (userObj != undefined) {
            embed
              .setColor("#00d166")
              .setAuthor("👤 User Information")
              .addFields(
                {
                  name: "Username: ",
                  value: userObj.username,
                },
                {
                  name: "Total Wall Checks: ",
                  value: userObj.userWallChecks.wallChecks,
                },
                {
                  name: "Total Buffer Checks: ",
                  value: userObj.userWallChecks.bufferChecks,
                },
                {
                  name: "Total Amount Deposited: ",
                  value: "$".concat(userObj.balance.toLocaleString()),
                }
              )
              .setDescription(description)
              .setThumbnail(options.urls.uuid + bot.players[user].uuid);
          } else {
            options.errorEmbed(embed, "User is not verified.");
          }
        })
        .catch((error) => {
          options.errorEmbed(embed, "User not found.");
        });
    }
  },
};
