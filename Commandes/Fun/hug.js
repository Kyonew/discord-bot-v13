const Discord = require("discord.js")
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "hug",
    description: "Besoin d'un câlin?",
    utilisation: "[user]",
    alias: ["hug"],
    permission: "Aucune",
    category: "Fun",
    cooldown: 3,

    async run(bot, message, args, db) {

        const Auser = message.author;
        let HUser = message.mentions.users.first() || bot.users.cache.get(args[0]);
        if(!HUser) HUser = bot.user;
    
            const GIF = await neko.sfw.hug();
           
            const hugembed = new Discord.MessageEmbed()
            .setColor('#a45fb2')
            .setDescription(`🤗 **${Auser.username}** hugs **${HUser.username}**`)
            .setFooter({text: 'Hug'})
            .setImage(GIF.url)
            .setTimestamp();
            
     
         message.channel.send({embeds: [hugembed]});
}
})