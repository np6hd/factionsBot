const { options } = require("./config");
const fetch = require("node-fetch");
const chalk = require("chalk");

let errorMessages = [];
async function validate() {
  if ((options.prefix = "")) {
    errorMessages.push("No prefix was added");
  }

  await fetch(options.urls.mojang, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent: {
        name: "Minecraft",
        version: 1,
      },
      username: options.username,
      password: options.password,
    }),
  })
    .then((response) => {
      return response.text();
    })
    .then(async (data) => {
      let parsedData = JSON.parse(data);
      if (parsedData.errorMessage) {
        errorMessages.push(parsedData.errorMessage);
      }

      const discord = require("discord.js");
      const client = new discord.Client();
      client.login(options.botToken);

      client.on("ready", () => {
        client.destroy();
      });

      process.on("unhandledRejection", (error) => {
        errorMessages.push(error.name + ": An invalid token was provided.");
      });

      await fetch(options.urls.serverStatus + options.serverIP, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          let parsedData = JSON.parse(data);
          if (!parsedData.online)
            errorMessages.push("Invalid server IP address was provided.");
        });
    });
}

validate().then(() => {
  if (errorMessages.length != 0) {
    for (eachmessage of errorMessages) console.log(chalk.red(eachmessage) + "\n");
    console.log(chalk.redBright("Client Stopped"));
    process.exit(22);
  }
  console.log(
    chalk.greenBright("Your input was validated, the bot will startup soon.\n")
  );
});
