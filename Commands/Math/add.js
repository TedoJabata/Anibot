module.exports = {
    name: 'add',
    execute: async(message, args) => {
        if (args.length < 1) {
            await message.channel.send(`<@${message.member.id}> give me some numbers!`)
            return
        }
        let sum = 0;

        args.forEach(element => { sum += Number(element) })

        if (String(sum) === 'NaN') {
            await message.channel.send(`<@${message.member.id}> give me valid numbers!`)
        } else if (args.length == 2 && args[0] == '9' && args[1] == '10' && sum == 19) {
            await message.channel.send(`<@${message.member.id}> The sum is ***21***`)
        } else {
            await message.channel.send(`<@${message.member.id}> The sum is ***${String(sum)}***`)
        }
    }
}