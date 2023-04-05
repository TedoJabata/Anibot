async function Send(text, reply, interaction, message) {
    if (interaction) {
        await interaction.reply(text)
    } else {
        if (reply) {
            await message.reply(text)
        } else {
            await message.channel.send(text)
        }
    }
}

module.exports = { Send }