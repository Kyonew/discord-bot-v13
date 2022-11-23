const Discord = require("discord.js");
const Command = require("../../Structure/Command");
const { DiscordTogether } = require('discord-together');


module.exports = new Command({

    name: "poker",
    description: "Jouez au poker ensemble !",
    utilisation: "",
    alias: ["poker"],
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
            bot.discordTogether.createTogetherCode(message.member.voice.channel.id, 'poker').then(async invite => {
                const ytembed = new Discord.MessageEmbed()
                .setTitle("Poker ♦")
                .setDescription(`> ** Appuie ci-dessous pour jouer au poker** !\n\n[Ouvrir un poker dans Discord](${invite.code})`)
                .setColor('BLURPLE')
                 message.reply({embeds: [ytembed]});
            });
        }   
        
    
    
    }
})




