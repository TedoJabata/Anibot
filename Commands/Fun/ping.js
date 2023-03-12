module.exports = {
    name: 'ping',
    run: async(client, message) => {
        return message.channel.send(`***Pong!***`)
    }
}