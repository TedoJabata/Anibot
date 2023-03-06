module.exports = {
    name: 'play',
    aliases: ['p'],
    inVoiceChannel: true,
    run: async(client, message, args) => {
        const searchString = args.join(' ')
        if (!searchString) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`)
        client.distube.play(message.member.voice.channel, searchString, {
            member: message.member,
            textChannel: message.channel,
            message
        })
    }
}



/*module.exports = {
    name: 'play',
    description: 'Play a song in your channel!',
    options: [{
        name: 'query',
        type: ApplicationCommandOptionType.String,
        description: 'The song you want to play',
        required: true,
    }, ],
    async execute(interaction, player) {
        try {
            if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
                return void interaction.reply({
                    content: 'You are not in a voice channel!',
                    ephemeral: true,
                });
            }

            if (
                interaction.guild.members.me.voice.channelId &&
                interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
            ) {
                return void interaction.reply({
                    content: 'You are not in my voice channel!',
                    ephemeral: true,
                });
            }

            await interaction.deferReply();

            const query = interaction.options.getString('query');
            const searchResult = await player
                .search(query, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO,
                })
                .catch(() => {});
            if (!searchResult || !searchResult.tracks.length)
                return void interaction.followUp({ content: 'No results were found!' });

            const queue = await player.createQueue(interaction.guild, {
                ytdlOptions: {
                    quality: "highest",
                    filter: "audioonly",
                    highWaterMark: 1 << 30,
                    dlChunkSize: 0,
                },
                metadata: interaction.channel,
            });

            try {
                if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            } catch {
                void player.deleteQueue(interaction.guildId);
                return void interaction.followUp({
                    content: 'Could not join your voice channel!',
                });
            }

            await interaction.followUp({
                content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...`,
            });
            searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
            if (!queue.playing) await queue.play();
        } catch (error) {
            console.log(error);
            interaction.followUp({
                content: 'There was an error trying to execute that command: ' + error.message,
            });
        }
    },
};
/*module.exports = {
    category: 'music',
    description: 'Play music',

    slash: true,
    testOnly: true,

    options: [{
        name: 'arg',
        description: 'link or keyword',
        type: ApplicationCommandOptionType.String,
        required: true,
    }],
    callback: ({ interaction, arg }) => {
        Play(interaction, arg)
    },
}*/