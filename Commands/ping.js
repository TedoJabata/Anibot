const { CommandType } = require("wokcommands");

module.exports = {
    description: "Ping pong command",
    type: CommandType.SLASH,

    slash: true,
    testOnly: true,

    callback: ({}) => {
        return {
            content: "Pong!",
        }
    },
}