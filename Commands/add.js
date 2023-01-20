const { CommandType } = require("wokcommands");

module.exports = {
    description: "Adds numbers together",
    type: CommandType.SLASH,

    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<num1> <num2>",

    callback: ({ args }) => {
        const sum = args.reduce((acc, cur) => {
            return acc + Number(cur)
        }, 0)

        return `The sum is ${sum}`
    },
}