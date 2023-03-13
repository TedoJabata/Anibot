module.exports = {
    name: 'leave',
    execute: async(message, args, client) => {
        client.distube.voices.leave(message)
    }
}