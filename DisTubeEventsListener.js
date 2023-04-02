require('events').EventEmitter.defaultMaxListeners = 15;

async function DisTubeEventsListener(client) {
    client.distube
        .on('playSong', (queue, song) =>
            queue.textChannel.send(`${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\``))
        .on('addSong', (queue, song) =>
            queue.textChannel.send(`${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`))
        .on('addList', (queue, playlist) =>
            queue.textChannel.send(`${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`))
        .on('searchNoResult', (message, query) => message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`))
        .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
        .on('error', (channel, e) => {
            if (channel) channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
            else console.error(e)
        })
}

module.exports = { DisTubeEventsListener }