const embedWrapper = "```";

module.exports = (client, serverChat) => {
  if (serverChat.length < 1 || serverChat == undefined) return;
  client.channels.cache
    .find((ch) => ch.name === 'serverchat')
    .send(embedWrapper + serverChat.join("\n") + embedWrapper);
};
