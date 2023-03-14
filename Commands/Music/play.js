module.exports = {
    name: 'play',
    aliases: ['p'],
    inVoiceChannel: true,
    execute: async(message, args, client) => {
        const searchString = args.join(' ')
        if (!searchString) return await message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`)
        await client.distube.play(message.member.voice.channel, searchString, {
            member: message.member,
            textChannel: message.channel,
            message
        })
    }
}