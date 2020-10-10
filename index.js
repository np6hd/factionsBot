const mineflayer = require("mineflayer");
const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
const { options, wait } = require("./Utils/config");
const database = require("./Utils/database");
const intervals = require("./Intervals/intervals");
const { rest } = require("lodash");

if (!database.isInitalized) {
  database.createDatabase();
} else {
  database.resetTempUsers();
  console.log("Database has been loaded");
}

client.commands = new discord.Collection();

const commandFiles = fs
  .readdirSync("./Commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);
  client.commands.set(command.name, command);
}

const prefix = options.prefix;
const minuteToMS = 60 * 1000;
const usedCommand = new Set();
const bold = "**";
let serverChat = [];
let commandsData = [];
let commandsExecuted = false;

const bot = mineflayer.createBot(options);
bindEvents(bot);

function bindEvents(bot) {
  bot.on("login", () => {
    console.log(bot.username + " has connected to " + options.host);
    bot.chat(options.joinCommand);
  });

  bot.on("message", (message) => {
    let chat = message.toString();
    if (chat.length < 1 || chat == undefined) return;
    if (!commandsExecuted) serverChat.push(chat);
    else commandsData.push(chat);
    console.log(chat);
  });

  bot.on("chat", function (username, message) {
    if (username === bot.username || !message.startsWith(prefix)) return;

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

      if (clientCommand.type != "ingame") return;
      if (clientCommand.checkArgs && !arguments) return;

      if (database.isShieldOn() && clientCommand.usesShield) {
        bot.chat("Error: Shield is enabled.");
        return;
      }
      if (clientCommand.name != "token" && !database.isUserVerified(username))
        return;

      let embed = new discord.MessageEmbed();

      clientCommand.execute(
        bot,
        database,
        arguments,
        options,
        client,
        username,
        embed
      );
    } catch (error) {
      console.error(error);
    }
  });

  bot.on("death", () => {
    console.log(bot.username + " has died. Respawning it...");
    bot.chat("/respawn");
  });

  bot.on("respawn", () => {
    console.log(bot.username + " has respawned");
  });

  // Log errors and kick reasons:
  bot.on("kicked", (reason, loggedIn) => {
    console.log(reason, loggedIn);
    restart();
  });

  bot.on("end", () => {
    restart();
  });

  bot.on("error", (err) => console.error(err));
}

/*
Discord Client Functions
*/

// Discord Client
client.on("ready", () => {
  console.log(bot.username + " has logged in discord");
  client.user.setActivity(`${options.serverIP}`, {
    type: "PLAYING",
  });
});

client.on("guildMemberRemove", (member) => {
  database.deleteUser(member.user.tag);
});

// Disallowed where you can run commands through direct messages of discord bot
client.on("message", (message) => {
  if (message.channel.type == "dm") return;

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const command = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/)
    .shift()
    .toLowerCase();

  if (!client.commands.has(command)) return;

  const arguments = message.content.split(" ").splice(1).join(" ");

  try {
    const clientCommand = client.commands.get(command);
    if (clientCommand.type != "discord") return;
    if (clientCommand.checkArgs && !arguments) {
      return message.reply(
        "Arguments were not provided. Please retry with arguments."
      );
    }

    if (usedCommand.has(message.author.id)) {
      return message.reply("You are in a cooldown");
    } else {
      usedCommand.add(message.author.id);
      wait(5000).then(() => {
        usedCommand.delete(message.author.id);
      });
    }

    let embed = new discord.MessageEmbed();
    embed
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL());

    // if (clientCommand.name == "restart") {
    //   embed.setColor("#A62019").setDescription("Restarting bot...");
    //   message.channel.send(embed);
    //   restart();
    //   return;
    // }

    clientCommand.execute(bot, database, arguments, options, embed, message);
    commandsExecuted = true;

    wait(300).then(() => {
      if (clientCommand.usesChat) {
        if (clientCommand.name == "ftop")
          clientCommand.parseChat(commandsData, embed, database);
        else embed.setDescription(bold + commandsData.join("\n") + bold);
      }
      if (clientCommand.sendEmbed) message.channel.send(embed);
      clear();
    });
  } catch (error) {
    console.error(error);
    message.reply("No such command found");
  }
});

// collect multiple messages in game and then sends it to the channel, every 3 seconds

setInterval(() => {
  if (!database.isChannelSetup()) {
    serverChat = [];
    return;
  }
  intervals.serverChatIntervals(client, serverChat);
  serverChat = [];
}, 3000);

setInterval(() => {
  if (!database.isShieldOn())
    intervals.wallCheckIntervals(bot, database, options);
}, options.wallCheckFrequency * minuteToMS);

setInterval(() => {
  if (!database.isShieldOn())
    intervals.bufferCheckIntervals(bot, database, options);
}, options.bufferCheckFrequency * minuteToMS + 5000);

setInterval(() => {
  intervals.joinCommandIntervals(bot, options);
}, options.joinCommandFrequency * minuteToMS);

const clear = () => {
  (commandsData = []), (commandsExecuted = false);
};

const end = () => {
  wait(5000).then(() => {
    database.resetTempUsers();
    console.log("Stopping client...");
    process.exit(22);
  });
};

const restart = () => {
  wait(10000).then(() => {
    bot = mineflayer.createBot(options);
    database.resetTempUsers();
    bindEvents(bot);
  });
};

client.login(options.botToken);
