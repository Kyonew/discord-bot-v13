const Discord = require("discord.js");
const Command = require("../../Structure/Command");
const { DiscordTogether } = require('discord-together');


module.exports = new Command({

    name: "youtube",
    description: "Regardez des vidéos ensemble !",
    utilisation: "",
    alias: ["youtube", 'yt'],
    permission: "Aucune",
    category: "Ensemble",
    cooldown: 5,

    async run(bot, message, interaction, args) {            
        bot.discordTogether = new DiscordTogether(bot);
        var novc = new Discord.MessageEmbed()
        .setDescription("**Tu n'es pas dans un salon vocal !**")
        .setColor('RED')


        if(!message.member.voice.channel) {
            return message.reply({embeds: [novc]})
        } else {
            bot.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
                const ytembed = new Discord.MessageEmbed()
                .setTitle("YouTube <:youtube:936913245854384169>")
                .setDescription(`> ** Appuie ci-dessous pour regarder YouTube** !\n\n[Ouvrir YouTube dans Discord](${invite.code})`)
                .setColor('BLURPLE')
                 message.reply({embeds: [ytembed]});
            });
        }   
        
    
    
    }
})




