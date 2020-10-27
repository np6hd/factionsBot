const pagination = require("discord.js-pagination");
const discord = require("discord.js");
module.exports = {
  name: "set",
  description: "Show How To Setup Channels/Times/Commands",
  checkArgs: false,
  arguments: "",
  type: "discord",
  category: "help",
  usesChat: false,
  sendEmbed: false,
  usesShield: false,
  adminPerms: true,
  execute(
    bot,
    database,
    arguments,
    options,
    embed,
    message,
    clientCommands,
    client
  ) {
    if (!arguments) {
      //create channel embed
      let channelEmbed = new discord.MessageEmbed();
      let description =
        `${
          options.boldWrap("Syntax:") +
          options.tripleWrap(options.prefix + "set <name> <#serverchannel>")
        }\n` +
        `${
          options.boldWrap("Example:") +
          options.tripleWrap(options.prefix + "set serverchat #serverchat")
        }\n`;
      for (eachArgs of options.channelCommands) {
        let getID = database.getChannelID(eachArgs);
        let channel = message.client.channels.cache.find(
          (channel) => channel.id === getID
        );
        description += options.boldWrap(eachArgs + ": ");
        if (channel == undefined) {
          description += options.italicsWrap("Channel Not Set") + "\n";
        } else {
          description += "<#" + getID + ">\n";
        }
      }
      channelEmbed
        .setAuthor("📺 Channel Settings")
        .setColor("#00C09A")
        .setDescription(description);
      //

      // create times embed
      let timeEmbed = new discord.MessageEmbed();
      let note = options.boldWrap("Note:");
      note +=
        options.orangeWrap(
          "You will have to restart the bot for it to take effect" +
            "\nLatency needs to be set in terms of ms (milliseconds)" +
            "\nThe rest of the time settings need to be in minutes"
        ) + "\n";

      description =
        options.boldWrap("Syntax: ") +
        options.tripleWrap(options.prefix + "set <times> <frequency>") +
        "\n";
      description +=
        options.boldWrap("Example: ") +
        options.tripleWrap(
          options.prefix +
            "set latency 200" +
            `\n${options.prefix + "set ftop 30"}`
        ) +
        "\n";
      for (eachTime of options.timeCommands) {
        let newTime = database.getTime(eachTime);
        description +=
          `${options.boldWrap(eachTime + ": ")}` +
          `${options.italicsWrap(newTime)}` +
          "\n";
      }
      timeEmbed
        .setAuthor("⏰ Time Settings")
        .setColor("#00C09A")
        .setDescription(note + description);
      //

      // create commands embed
      let commandEmbed = new discord.MessageEmbed();
      note = options.boldWrap("Note:");
      note +=
        options.orangeWrap(
          "You will have to restart the bot for it to take effect"
        ) + "\n";
      description =
        options.boldWrap("Syntax: ") +
        options.tripleWrap(
          options.prefix + "set <command> <in-game-commands>"
        ) +
        "\n";
      description +=
        options.boldWrap("Example: ") +
        options.tripleWrap(options.prefix + "set joinCommand /demonic") +
        "\n";
      for (eachCommands of options.commands) {
        let commandArg = database.getCommand(eachCommands);
        description +=
          `${options.boldWrap(eachCommands + ": ")}` +
          `${options.italicsWrap(commandArg)}\n`;
      }
      commandEmbed
        .setAuthor("📦 Commands Settings")
        .setColor("#00C09A")
        .setDescription(note + description);
      //

      let pages = [channelEmbed, timeEmbed, commandEmbed];

      pagination(message, pages);
    } else {
      let splitArgs = arguments.split(" ");
      if (options.channelCommands.includes(splitArgs[0])) {
        if (!splitArgs[1]) {
          options.errorEmbed(
            embed,
            options.boldWrap("Syntax:") +
              options.tripleWrap(
                `${
                  options.prefix +
                  this.name +
                  " " +
                  splitArgs[0] +
                  " <#channel>"
                } `
              )
          );
          embed.setFooter("<> = required, [] = optional");
          message.channel.send(embed);
          return;
        } else {
          database.setChannel(
            splitArgs[0],
            splitArgs[1].replace(/[^a-zA-Z0-9]/g, "")
          );
          options.successEmbed(
            embed,
            `Set ${splitArgs[0]} channel to ${splitArgs[1]}`
          );
        }
      } else if (options.timeCommands.includes(splitArgs[0])) {
        if (!splitArgs[1]) {
          options.errorEmbed(
            embed,
            options.boldWrap("Syntax:") +
              options.tripleWrap(
                `${options.prefix + this.name + " " + splitArgs[0] + " <time>"}`
              )
          );
          embed.setFooter("<> = required, [] = optional");
          message.channel.send(embed);
          return;
        } else {
          if (!/^\d+$/.test(splitArgs[1])) {
            options.errorEmbed(embed, "Time must be a number.");
            message.channel.send(embed);
            return;
          }
          if (parseInt(splitArgs[1]) <= 0) {
            options.errorEmbed(embed, "Time must be greater than 0.");
            message.channel.send(embed);
            return;
          }
          database.setTime(splitArgs[0], parseInt(splitArgs[1]));
          options.successEmbed(
            embed,
            `Set ${splitArgs[0]} interval to ${splitArgs[1]}`
          );
          embed.setTitle("Please restart the bot for times to take effect");
        }
      } else if (options.commands.includes(splitArgs[0])) {
        if (!splitArgs[1]) {
          options.errorEmbed(
            embed,
            options.boldWrap("Syntax:") +
              options.tripleWrap(
                options.prefix +
                  this.name +
                  " " +
                  splitArgs[0] +
                  " <in-game-command>"
              )
          );
          embed.setFooter("<> = required, [] = optional");
          message.channel.send(embed);
          return;
        } else {
          let fullCommand = arguments.substring(arguments.indexOf(splitArgs[1]));
          database.setCommand(splitArgs[0], fullCommand);
          options.successEmbed(
            embed,
            "Set " + splitArgs[0] + " to " + fullCommand + " command"
          );
          embed.setTitle("Please restart the bot for commands to take effect");
        }
      } else {
        options.errorEmbed(
          embed,
          `${
            "Type " + options.prefix + this.name + " to check for valid syntax."
          }`
        );
      }
      message.channel.send(embed);
    }
  },
};
