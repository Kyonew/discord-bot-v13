const Discord = require("discord.js")
const config = require("../../config")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "snipe",
    description: "Snipe un message",
    utilisation: "",
    alias: ["snipe"],
    permission: "Aucune",
    category: "Utiles",
    cooldown: 5,

    async run(bot, message, args, db) {

        const msg = bot.snipes.get(message.channel.id)
        if(!msg) return message.channel.send("Aucun message à snipe")
        const embed = new Discord.MessageEmbed()
        .setTitle("Snipe 🎯")
        .setDescription(`${msg.content}`)
        .setColor("BLURPLE")
        .setFooter(msg.author.username,msg.author.displayAvatarURL({dynamic : true }))
        .setTimestamp()  
        if(msg.image)embed.setImage(msg.image)
        
        message.channel.send({embeds: [embed]})
    }
})