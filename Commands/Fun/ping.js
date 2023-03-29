module.exports = {
    name: 'ping',
    execute: async(message) => {
        await message.channel.send(`Pong!`)
    }
};