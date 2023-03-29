module.exports = {
    name: 'hello',
    execute: async(message) => {
        message.channel.send(`Hello <@${message.author.id}>!`);
    }
};