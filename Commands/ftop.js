module.exports = {
  name: "ftop",
  description: "Run faction top command and show the current top factions",
  checkArgs: false,
  type: "discord",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat("/f top");
    embed.setColor("#a62019").setTitle("Factions Top | " + options.serverIP);
  },
  parseChat(chatData, embed, database) {
    let currentFtop = [];
    let facName = "";
    let value = "";
    let change = "";
    for (eachLine of chatData) {
      let moneyValue = "";
      if (eachLine.includes("$")) {
        let newIndex = eachLine.indexOf("$");
        let moneyValue = eachLine.substring(newIndex);
        if (moneyValue.indexOf(" ") != -1) {
          moneyValue = moneyValue.substring(0, moneyValue.indexOf(" "));
        }
        eachLine = eachLine.replace(/[^a-zA-Z0-9]/g, "");
        eachLine = eachLine
          .replace(/(\d)([a-z])/gi, "$1 $2")
          .replace(/([a-z])(\d)/gi, "$1 $2");
        let splitText = eachLine.split(" ");
        facName += splitText[0] + ". " + splitText[1] + "\n";
        value += moneyValue + "\n";

        currentFtop.push({
          factionName: splitText[1],
          value: parseInt(moneyValue.replace("$", "").split(",").join("")),
        });
        let facObj = database.findFaction(splitText[1]);
        if (facObj.value() != undefined) {
          let tempChange =
            (currentFtop.find((faction) => faction.factionName == splitText[1])
              .value -
              facObj.get("value").value());
          if(tempChange >= 0) {
            tempChange = tempChange.toLocaleString();
            change += "+$" + tempChange + "\n";
          } else {
            tempChange = Math.abs(tempChange)
            tempChange = tempChange.toLocaleString();
            change += "-$" + tempChange + "\n";
          }
        } else {
          change += "N/A\n";
        }
      }
    }
    database.pushFtop(currentFtop);
    embed.addFields(
      {
        name: "Factions",
        value: facName,
        inline: true,
      },
      {
        name: "Value",
        value: value,
        inline: true,
      },
      {
        name: "Change",
        value: change,
        inline: true,
      }
    );
  },
};
