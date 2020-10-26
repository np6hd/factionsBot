module.exports = {
  name: "banktop",
  description: "Track the top depositors in your faction",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "factions",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: false,
  execute(bot, database, arguments, options, embed, message) {
    const allUsers = database
      .getAllUsersObject()
      .orderBy("balance", "desc")
      .value();
    let users = "";
    let moneyValue = "";
    let count = 1;
    if (allUsers.length == 0) {
      options.errorEmbed(embed, "There is not enough user data.");
      return;
    }
    for (eachUser of allUsers) {
      users += `${count}. ${eachUser.username}\n`;
      moneyValue += `$${eachUser.balance.toLocaleString()}\n`;
      count += 1;
    }

    embed.setColor("#00C09A").setAuthor("💰 Top Depositors").addFields(
      {
        name: "Depositors",
        value: users,
        inline: true,
      },
      {
        name: "Balance",
        value: moneyValue,
        inline: true,
      }
    );
  },
};
