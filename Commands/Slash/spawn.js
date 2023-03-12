const { CommandType } = require("wokcommands");

module.exports = {
    description: "Spawn pokemon",

    type: CommandType.SLASH,

    callback: () => {
        return {
            content: "Insert info here",
        }
    },
}