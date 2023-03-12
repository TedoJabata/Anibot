module.exports = {
    name: 'add',
    run: async(client, message, args) => {
        let sum = 0;

        args.forEach(element => {
            sum += Number(element);
            console.log(sum)
        });
        return message.channel.send(`<@${message.author.id}> The sum is ***${String(sum)}***`)
    }
}