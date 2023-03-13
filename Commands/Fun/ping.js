module.exports = {
    name: 'ping',
    description: "ping pong command",
    execute(message, args) {
        message.channel.send(`Pong!`);
    }
};



// module.exports = {
//     name: 'ping',
//     run: async(client, message) => {
//         return message.channel.send(`***Pong!***`)
//     }
// }