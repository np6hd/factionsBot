module.exports = {
  name: "cmd",
  description: `Run the exact in-game minecraft commands followed by "\/"`,
  checkArgs: true,
  arguments: "<arguments>",
  type: "discord",
  category: "admin",
  usesChat: true,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message) {
    bot.chat(arguments);
    embed
      .setColor("#00d166")
      .setAuthor("✅ Command Executed");
  },
};
