const bold = "**";

module.exports = {
  name: "monkeyfacts",
  description: "Do some cool things",
  checkArgs: false,
  type: "ingame",
  usesChat: false,
  sendEmbed: false,
  usesShield: false,
  execute(bot, database, arguments, options, client, username, embed) {
    const strings = [
      'There are currently 264 known monkey species',
      'Monkeys can be divided into two groups, Old World monkeys that live in Africa and Asia, and New World monkeys that live in South America',
      'Apes are not monkeys',
      "Some monkeys live on the ground, while others live in trees",
      "A baboon is an example of an Old World monkey, while a marmoset is an example of a New World monkey",
      "Spider monkeys get their name because of their long arms, legs and tail",
      "The monkey is the 9th animal that appears on the Chinese zodiac, appearing as the zodiac sign in 2016",
      "Most monkeys have tails",
      "Groups of monkeys are known as a ‘tribe’, ‘troop’ or ‘mission’",
      "The Mandrill is the largest type of monkey, with adult males weighing up to 35 kg",
    ];
    var randomNumber = Math.floor(Math.random() * strings.length);
    bot.chat(strings[randomNumber]);
  },
};
