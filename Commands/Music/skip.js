module.exports = {
    name: 'skip',
    inVoiceChannel: true,
    execute: async(message, args, client) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return await message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        try {
            const song = await queue.skip()
            await message.channel.send(`${client.emotes.success} | Skipped! Now playing:\n${song.name}`)
        } catch (e) {
            await message.channel.send(`${client.emotes.error} | ${e}`)
        }
    }
}