const Discord = require("discord.js")
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "slap",
    description: "Donnez une claque à quelqu'un",
    utilisation: "[user]",
    alias: ["slap"],
    permission: "Aucune",
    category: "Fun",
    cooldown: 3,

    async run(bot, message, args, db) {

        const Auser = message.author;
        let HUser = message.mentions.users.first() || bot.users.cache.get(args[0]);
        if(!HUser) HUser = bot.user;
    
            const GIF = await neko.sfw.slap();
           
            const pokembed = new Discord.MessageEmbed()
            .setColor('#a45fb2')
            .setDescription(`✋ **${Auser.username}** slaps **${HUser.username}**`)
            .setFooter({text: 'Slap'})
            .setImage(GIF.url)
            .setTimestamp();
            
     
         message.channel.send({embeds: [pokembed]});
}
})