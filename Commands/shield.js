let bold = "**";
let embedWrapper = "```";
module.exports = {
  name: "shield",
  description: "Turn on/off wall check operations",
  checkArgs: true,
  arguments: "<on/off>",
  type: "discord",
  category: "admin",
  usesChat: false,
  sendEmbed: true,
  usesShield: false,
  adminPerms: true,
  execute(bot, database, arguments, options, embed, message) {
    if (arguments == "on") {
      if (database.isShieldOn()) {
        embed.setColor("#f8c300").setDescription("```Shield is already on```");
        return;
      }
      embed
        .setColor("#00d166")
        .setDescription(
          "```Shield is enabled, all wall check operations are halted```"
        );
    } else if (arguments == "off") {
      if (!database.isShieldOn()) {
        embed.setColor("#f8c300").setDescription("```Shield is already off```");
        return;
      }
      embed
        .setColor("#fd0061")
        .setDescription(
          "```Shield is disabled, all wall check operations are resumed```"
        );
    } else {
      let error = "⚠️ **Error** - `invalid arguments`\n\n";
      error += `${bold}Syntax:${bold}${embedWrapper}${options.prefix}${this.name} ${this.arguments}${embedWrapper}\n`;
      embed
        .setColor("#f93a2f")
        .setDescription(error)
        .setFooter("<> = required, [] = optional");
      return;
    }
    database.toggleShield();
  },
};
