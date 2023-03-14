module.exports = {
    name: 'leave',
    execute: async(message, args, client) => {
        await client.distube.voices.leave(message)
    }
}