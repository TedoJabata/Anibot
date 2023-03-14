module.exports = {
    name: 'ping',
    execute: async(message) => {
        message.channel.send(`Pong!`);
    }
};