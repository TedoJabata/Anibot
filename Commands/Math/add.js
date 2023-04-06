module.exports = {
    name: 'add',
    execute: async(message, args) => {
        if (args.length < 1) {
            await message.channel.send(`<@${message.member.id}> give me some numbers!`)
            return
        }

        let result = 0;
        let validNumbers = false

        args.forEach(element => {
            if (Number(element)) {
                validNumbers = true
                result += Number(element)
            }
        })

        if (result % 1 != 0) {
            if (result < 0.01) {
                result = 0
            } else {
                result.toFixed(2)
            }
        }

        if (!validNumbers) {
            await message.channel.send(`<@${message.member.id}> give me valid numbers!`)
        } else {
            await message.channel.send(`<@${message.member.id}> The sum is ***${String(result)}***`)
        }
    }
}