// Call Mineflayer and discord library
// Call datastorage file where most of the data will be read/writtten
// Call chalk library to beautify console log messages
const mineflayer = require("mineflayer");
const discord = require("discord.js");
const chalk = require("chalk");
const client = new discord.Client();
const fs = require("fs");
const database = require("./Utils/database");
//

// Obtain the informations user has provided
const config = require("./utils/config");
const options = config.options;
//

// Get the intervals
const intervals = require("./intervals/intervals");
//

if (!database.isInitalized) {
  database.createDatabase();
} else {
  database.resetTempUsers();
  console.log(chalk.greenBright("Database has been loaded"));
}

// Obtain all the commands from ./commands folder.
client.commands = new discord.Collection();
const commandFiles = fs
  .readdirSync("./Commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
//

// Global Variables
const prefix = options.prefix;
const usedCommand = new Set();
let botRestarting = false;
let serverChat = [];
let commandsData = [];
let commandsExecuted = false;
//

// Handle In Game User
var bot = mineflayer.createBot(options);
bindEvents(bot);

function bindEvents(bot) {
  bot.on("login", () => {
    bot.settings.viewDistance = "tiny";
    bot.settings.colorsEnabled = false;

    console.log(
      chalk.red(bot.username) +
        chalk.green(" has connected to ") +
        chalk.red(options.serverIP)
    );
    bot.chat(database.getCommand("joinCommand"));
  });

  bot.on("message", (message) => {
    let chat = message.toString();
    if (chat.length < 1 || chat == undefined) return;
    if (chat.includes("@")) return;
    if (database.isTrackingMoney()) {
      handleMoney(chat);
    }
    if (!commandsExecuted) serverChat.push(chat);
    else commandsData.push(chat);
    console.log(message.toAnsi());
  });

  bot.on("chat", function (username, message) {
    if (!message.startsWith(prefix)) return;

    let chat = message.toString();
    if (chat.length < 1 || chat == undefined) return;

    const command = chat
      .slice(prefix.length)
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();

    if (!client.commands.has(command)) return;

    const arguments = message.split(" ").splice(1).join(" ");
    try {
      const clientCommand = client.commands.get(command);

      if (clientCommand.name != "token" && !database.isUserVerified(username))
        return;

      if (clientCommand.type == "discord") {
        bot.chat("Error: Run the command in discord");
        return;
      }

      if (database.isShieldOn() && clientCommand.usesShield) {
        bot.chat("Error: Shield is enabled");
        return;
      }

      if (clientCommand.checkArgs && !arguments) {
        bot.chat(
          `Error: Wrong Syntax, type - ${options.prefix}${clientCommand.name} ${clientCommand.arguments}`
        );
        return;
      }

      let embed = new discord.MessageEmbed();
      embed.setTimestamp();

      clientCommand.execute(
        bot,
        database,
        arguments,
        options,
        embed,
        (message = ""),
        client.commands,
        client,
        username
      );
    } catch (error) {
      console.error(error);
    }
  });

  bot.on("death", () => {
    console.log(
      chalk.red(bot.username) + chalk.yellow(" has died. Respawning it...")
    );
    bot.chat("/respawn");
  });

  bot.on("respawn", () => {
    console.log(chalk.red(bot.username) + chalk.yellow(" has respawned"));
  });

  // Log errors and kick reasons:
  bot.on("kicked", (reason, loggedIn) => {
    console.log(reason, loggedIn);
    bot.quit();
  });

  bot.on("end", () => {
    restart();
  });

  bot.on("error", (err) => console.error(err));
}
//

// Handle Discord Functions
client.on("ready", () => {
  console.log(chalk.red(bot.username) + chalk.green(" has logged in discord"));
  client.user.setActivity(`${options.serverIP}`, {
    type: "PLAYING",
  });
});

client.on("guildMemberRemove", (member) => {
  database.deleteUser(member.user.tag);
  console.log(
    chalk.red(member.user.tag) +
      chalk.yellow(
        ", has left the server if they were whitelisted they have been removed"
      )
  );
});

// Disallowed where you can run commands through direct messages of discord bot
client.on("message", (message) => {
  if (message.channel.type == "dm") {
    return;
  }

  if (!message.content.startsWith(prefix)) return;

  const command = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/)
    .shift()
    .toLowerCase();

  if (message.author.bot) {
    if (command != "ftop" && command != "flist") {
      return;
    }
  }

  let embed = new discord.MessageEmbed();
  embed
    .setTimestamp()
    .setFooter(message.author.tag, message.author.displayAvatarURL());
  if (!client.commands.has(command)) return;

  const arguments = message.content.split(" ").splice(1).join(" ");

  try {
    const clientCommand = client.commands.get(command);

    if (clientCommand.type == "ingame") {
      options.errorEmbed(embed, "Run this command in game.");
      message.channel.send(embed);
      return;
    }

    if (clientCommand.checkArgs && !arguments) {
      let error = `${options.boldWrap("Syntax:")} ${options.tripleWrap(
        options.prefix + clientCommand.name + " " + clientCommand.arguments
      )}\n`;
      embed
        .setColor("#f8c300")
        .setAuthor("⚠️ Error")
        .setDescription(error)
        .setFooter("<> = required, [] = optional");
      message.channel.send(embed);
      return;
    }

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      if (usedCommand.has(message.author.id)) {
        options.cooldownEmbed(
          embed,
          "You are in a cooldown from running commands."
        );
        message.channel.send(embed);
        return;
      } else {
        usedCommand.add(message.author.id);
        options.wait(10000).then(() => {
          usedCommand.delete(message.author.id);
        });
      }

      if (clientCommand.adminPerms) {
        options.permissionEmbed(
          embed,
          "You do not have permission to run this command."
        );
        message.channel.send(embed);
        return;
      }
      if (
        clientCommand.name != "verify" &&
        clientCommand.name != "help" &&
        !database.isVerified(message.author.tag)
      ) {
        options.errorEmbed(embed, "You need to verified to run this command.");
        message.channel.send(embed);
        return;
      }
    }

    if (botRestarting) {
      options.errorEmbed(embed, "Bot is currently restarting.");
      message.channel.send(embed);
      return;
    }

    if (database.isShieldOn() && clientCommand.usesShield) {
      options.errorEmbed(
        embed,
        "Shield is enabled, you can't run wall related commands."
      );
      message.channel.send(embed);
      return;
    }

    clientCommand.execute(
      bot,
      database,
      arguments,
      options,
      embed,
      message,
      client.commands,
      client,
      (username = "")
    );
    commandsExecuted = true;

    options.wait(database.getTime("latency")).then(() => {
      if (clientCommand.usesChat) {
        if (
          commandsData.length == 0 ||
          commandsData[0].toLowerCase().includes("unknown")
        ) {
          options.errorEmbed(
            embed,
            "You might be in the hub, set the joincommand first and wait for bot to join the faction server." +
              "\nOr you can restart the bot to immediately join using the joincommand."
          );
          message.channel.send(embed);
          clear();
          return;
        }
        if (clientCommand.name == "ftop")
          clientCommand.parseChat(commandsData, embed, database);
        else {
          embed.setDescription(options.tripleWrap(commandsData.join("\n")));
        }
      }
      if (clientCommand.sendEmbed) message.channel.send(embed);
      clear();
    });
  } catch (error) {
    console.error(error);
  }
});

client.on("error", (error) => {
  console.log(error);
});
//

// Miscallenous

setInterval(() => {
  const channel = client.channels.cache.find(
    (channel) => channel.id === database.getChannelID("serverchat")
  );
  if (channel != undefined) {
    if (serverChat.length < 1 || serverChat == undefined) return;
    channel.send(options.tripleWrap(serverChat.join("\n")));
  }
  serverChat = [];
}, 3000);

setInterval(() => {
  if (!database.isShieldOn()) {
    const channel = client.channels.cache.find(
      (channel) => channel.id === database.getChannelID("wallchecks")
    );
    if (channel != undefined) {
      let embed = new discord.MessageEmbed();
      embed.setTimestamp();
      intervals.wallCheckIntervals(bot, database, options, channel, embed);
    } else bot.chat("Error: Wallchecks channel is not setup");
  }
}, options.minuteToMS);

setInterval(() => {
  if (!database.isShieldOn()) {
    const channel = client.channels.cache.find(
      (channel) => channel.id === database.getChannelID("bufferchecks")
    );
    if (channel != undefined) {
      let embed = new discord.MessageEmbed();
      embed.setTimestamp();
      intervals.bufferCheckIntervals(bot, database, options, channel, embed);
    } else bot.chat("Error: Bufferchecks channel is not setup");
  }
}, options.minuteToMS + 5000);

setInterval(() => {
  const channel = client.channels.cache.find(
    (channel) => channel.id === database.getChannelID("ftop")
  );
  if (channel != undefined) {
    channel.send(`${options.prefix}ftop`);
  } else {
    bot.chat("Error: Factionstop channel is not setup");
  }
}, database.getTime("auto_ftop") * options.minuteToMS);

setInterval(() => {
  const channel = client.channels.cache.find(
    (channel) => channel.id === database.getChannelID("flist")
  );
  if (channel != undefined) {
    channel.send(`${options.prefix}flist`);
  } else {
    bot.chat("Error: Factionslist channel is not setup");
  }
}, database.getTime("auto_flist") * options.minuteToMS + 5000);

setInterval(() => {
  bot.chat(database.getCommand("joinCommand"));
}, database.getTime("auto_joincommand") * options.minuteToMS);

const clear = () => {
  (commandsData = []), (commandsExecuted = false);
};

const restart = () => {
  botRestarting = true;
  options.wait(options.minuteToMS / 10).then(() => {
    console.log(chalk.yellow("Bot is restarting..."));
    bot = mineflayer.createBot(options);
    database.resetTempUsers();
    bindEvents(bot);
    botRestarting = false;
  });
};

let handleMoney = (chat) => {
  if (chat.includes("gave $") || chat.includes("took $")) {
    let channel = client.channels.cache.find(
      (ch) => (ch.id = database.getChannelID("bank"))
    );
    if (channel != undefined) {
      let splitMsg = chat.split(" ");
      let user = splitMsg[0].split("*").join("");
      if (!database.isUserVerified(user)) {
        bot.chat(
          "Error: " +
            user +
            " has not been verified yet, cannot track their depsoits."
        );
        return;
      }
      let money = parseFloat(
        chat
          .slice(chat.indexOf("$") + 1)
          .split(",")
          .join("")
      );

      let embed = new discord.MessageEmbed();
      embed.setThumbnail(options.urls.uuid + bot.players[user].uuid);
      if (chat.includes("gave")) {
        database.updateDeposit(user, money);
        money = "$".concat(money.toLocaleString());

        embed
          .setDescription(
            "💰 " +
              options.boldWrap(user) +
              " deposited " +
              options.boldWrap(money)
          )
          .setColor("#008e44");
        bot.chat("Bank: " + user + ", deposited " + money);
      } else {
        database.updateWithdraw(user, money);
        money = "$".concat(money.toLocaleString());

        embed
          .setDescription(
            "💰 " +
              options.boldWrap(user) +
              " withdrew " +
              options.boldWrap(money)
          )
          .setColor("#A62019");
        bot.chat("Bank: " + user + ", withdrew " + money);
      }
      channel.send(embed);
    } else {
      bot.chat("Error: Bank channel is not setup");
    }
  }
};
//

// Login to discord
client.login(options.botToken);
//
