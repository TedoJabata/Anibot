const config = require('../config.json')

async function MessageHandler(message, client) {
    if (message.author.bot || !message.guild) return
    const prefix = config.prefix
    if (message.content.split(' ')[0] != prefix) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) { message.channel.send("Invalid command"); return }
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
        return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    }
    try {
        cmd.execute(message, args, client)
    } catch (error) {
        console.log(error)
        console.log("Invalid command")
        message.channel.send("Invalid command")
    }
}

module.exports = { MessageHandler }