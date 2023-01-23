module.exports = {
    async Add(message, args) {
        let sum = 0;

        args.forEach(element => {
            sum += Number(element);
            console.log(sum)
        });
        message.channel.send(`<@${message.author.id}> The sum is ***${String(sum)}***`)
    }
}