module.exports = {
    name: 'hello',
    execute: async(message) => {
        await message.channel.send(`Hello <@${message.author.id}>!`)
    }
};