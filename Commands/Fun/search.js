const GoogleImages = require('google-images')
const client = new GoogleImages(process.env.SEARCH_MACHINE_ID, process.env.GOOGLE_API_KEY)
require("dotenv/config")

module.exports = {
    name: 'search',
    execute: async(message, args) => {
        client.search(args.join(' '))
            .then(async images => {
                images = images.filter(img => !img.url.endsWith('.svg'));
                await message.reply(`${images[Math.floor(Math.random() * images.length)].url}`)
            });
    }
}