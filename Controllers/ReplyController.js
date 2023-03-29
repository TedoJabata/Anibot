async function Send(isInteraction, text, reply, interaction, message) {
    if (isInteraction) {
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