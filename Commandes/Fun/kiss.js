const Discord = require("discord.js")
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "kiss",
    description: "Faites un bisous",
    utilisation: "[user]",
    alias: ["kiss", 'bisous'],
    permission: "Aucune",
    category: "Fun",
    cooldown: 3,

    async run(bot, message, args, db) {

        const Auser = message.author;
        let HUser = message.mentions.users.first() || bot.users.cache.get(args[0]);
        if(!HUser) HUser = bot.user;
    
            const GIF = await neko.sfw.kiss();
           
            const kissembed = new Discord.MessageEmbed()
            .setColor('#a45fb2')
            .setDescription(`😘 **${Auser.username}** kisses **${HUser.username}**`)
            .setFooter({text: "Kiss"})
            .setImage(GIF.url)
            .setTimestamp();
            
     
         message.channel.send({embeds: [kissembed]});
}
})