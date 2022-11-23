const Discord = require("discord.js");
const Command = require("../../Structure/Command");
const { DiscordTogether } = require('discord-together');


module.exports = new Command({

    name: "betrayal",
    description: "Regardez à Betrayal ensemble !",
    utilisation: "",
    alias: ["betrayal"],
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
            bot.discordTogether.createTogetherCode(message.member.voice.channel.id, 'betrayal').then(async invite => {
                const ytembed = new Discord.MessageEmbed()
                .setTitle("Betrayal 🎮")
                .setDescription(`> ** Appuie ci-dessous pour jouer à Betrayal** !\n\n[Ouvrir Betrayal dans Discord](${invite.code})`)
                .setColor('BLURPLE')
                 message.reply({embeds: [ytembed]});
            });
        }   
        
    
    
    }
})




