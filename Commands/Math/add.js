module.exports = {
    name: 'add',
    execute: async(message, args) => {
        if (args.length < 1) {
            await message.channel.send(`<@${message.member.id}> give me some numbers!`)
            return
        }

        let sum = 0;
        let validNumbers = false

        args.forEach(element => {
            if (Number(element)) {
                validNumbers = true
                sum += Number(element)
            }
        })

        if (!validNumbers) {
            await message.channel.send(`<@${message.member.id}> give me valid numbers!`)
        } else {
            await message.channel.send(`<@${message.member.id}> The sum is ***${String(sum)}***`)
        }
    }
}