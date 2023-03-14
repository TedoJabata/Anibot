module.exports = {
    name: 'resume',
    aliases: ['resume', 'unpause'],
    inVoiceChannel: true,
    execute: async(message, args, client) => {
        const queue = await client.distube.getQueue(message)
        if (!queue) return await message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        if (queue.paused) {
            await queue.resume()
            await message.channel.send('Resumed the song for you :)')
        } else {
            await message.channel.send('The queue is not paused!')
        }
    }
}