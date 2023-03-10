const { CommandType } = require("wokcommands");

module.exports = {
    description: "Info command",

    type: CommandType.SLASH,

    callback: () => {
        return {
            content: "***Pong!***",
        }
    },
}