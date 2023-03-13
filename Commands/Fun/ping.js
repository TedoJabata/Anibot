module.exports = {
    name: 'ping',
    description: "ping pong command",
    execute(message, args) {
        message.channel.send(`Pong!`);
    }
};