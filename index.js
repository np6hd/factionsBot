const mineflayer = require("mineflayer");
const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
const { options, wait } = require("./Utils/config");
const database = require("./Utils/database");
const intervals = require("./Intervals/intervals");

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
const embedWrapper = "```";
let botRestarting = false;
let serverChat = [];
let commandsData = [];
let commandsExecuted = false;

var bot = mineflayer.createBot(options);
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

      if (clientCommand.name != "token" && !database.isUserVerified(username))
        return;

      if (database.isShieldOn() && clientCommand.usesShield) {
        bot.chat("Error: Shield is enabled.");
        return;
      }
      let embed = new discord.MessageEmbed();
      embed
        .setTimestamp()
        .setThumbnail(options.url + bot.players[username].uuid);

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
    bot.quit();
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

  let embed = new discord.MessageEmbed();
  embed
    .setTimestamp()
    .setFooter(message.author.tag, message.author.displayAvatarURL());

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

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      if (
        clientCommand.name != "verify" &&
        clientCommand.name != "help" &&
        !database.isVerified(message.author.tag)
      ) {
        return message.reply("You need to be verified to run that command");
      }
      if (usedCommand.has(message.author.id)) {
        return message.reply("You are in a cooldown");
      } else {
        usedCommand.add(message.author.id);
        wait(10000).then(() => {
          usedCommand.delete(message.author.id);
        });
      }
      if (clientCommand.adminPerms) {
        embed
          .setColor("#7a2f8f")
          .setDescription(
            embedWrapper +
              "❌ You do not have permissions to run this command" +
              embedWrapper
          );
        message.channel.send(embed);
        return;
      }
    }

    if (botRestarting) return;
    clientCommand.execute(
      bot,
      database,
      arguments,
      options,
      embed,
      message,
      client.commands
    );
    commandsExecuted = true;

    wait(300).then(() => {
      if (clientCommand.usesChat) {
        if (clientCommand.name == "ftop")
          clientCommand.parseChat(commandsData, embed, database);
        else embed.setDescription("```" + commandsData.join("\n") + "```");
      }
      if (clientCommand.sendEmbed) message.channel.send(embed);
      clear();
    });
  } catch (error) {
    console.error(error);
  }
});

// collect multiple messages in game and then sends it to the channel, every 3 seconds

setInterval(() => {
  const channel = client.channels.cache.find(
    (channel) => channel.id === database.getChannelID("serverchat")
  );
  if (channel != undefined) {
    if (serverChat.length < 1 || serverChat == undefined) return;
    channel.send(embedWrapper + serverChat.join("\n") + embedWrapper);
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
    } else bot.chat("Error: Wallcheck channel has not been setup");
  }
}, options.wallCheckFrequency * minuteToMS);

setInterval(() => {
  if (!database.isShieldOn()) {
    const channel = client.channels.cache.find(
      (channel) => channel.id === database.getChannelID("bufferchecks")
    );
    if (channel != undefined) {
      let embed = new discord.MessageEmbed();
      embed.setTimestamp();
      intervals.bufferCheckIntervals(bot, database, options, channel, embed);
    } else bot.chat("Error: Buffercheck channel has not been setup");
  }
}, options.bufferCheckFrequency * minuteToMS + 5000);

setInterval(() => {
  bot.chat(options.joinCommand);
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
  botRestarting = true;
  wait(minuteToMS / 10).then(() => {
    console.log("Bot is restarting...");
    bot = mineflayer.createBot(options);
    database.resetTempUsers();
    bindEvents(bot);
    botRestarting = false;
  });
};

client.login(options.botToken);
