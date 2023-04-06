const config = require('../config.json')

async function MessageHandler(message, client) {
    if (message.author.bot || !message.guild) return

    const prefix = config.prefix

    if (message.content.split(' ')[0].toLowerCase() != prefix) return

    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    let command = args.shift().toLowerCase()
    let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if (!cmd) { await message.reply("Invalid command."); return }

    if (cmd.inVoiceChannel && !message.member.voice.channel) {
        return await message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    }

    try {
        await cmd.execute(message, args, client)
    } catch (error) {
        console.log(error)
        console.log("Invalid command")
        await message.reply("Invalid command.")
    }
}

module.exports = { MessageHandler }