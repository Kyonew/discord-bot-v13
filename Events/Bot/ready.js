const Discord = require("discord.js")
const Event = require("../../Structure/Event");
const SlashCommand = require("../../Structure/SlashCommand")

module.exports = new Event("ready", async bot => {

    const db = bot.db;

    await SlashCommand(bot);

    bot.user.setStatus("online")
   // bot.user.setAvatar('https://cdn.discordapp.com/attachments/899320565582680096/972785421719339008/athem.png')
    bot.user.setActivity("+help", {type: "STREAMING", url: "https://twitch.tv/Zocian"})

    console.log(`${bot.user.username} : En ligne sur ${bot.guilds.cache.size} serveur(s) !`)

})