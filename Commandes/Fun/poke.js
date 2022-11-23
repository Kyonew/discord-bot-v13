const Discord = require("discord.js")
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "poke",
    description: "Embêtez quelqu'un",
    utilisation: "[user]",
    alias: ["poke"],
    permission: "Aucune",
    category: "Fun",
    cooldown: 3,

    async run(bot, message, args, db) {

        const Auser = message.author;
        let HUser = message.mentions.users.first() || bot.users.cache.get(args[0]);
        if(!HUser) HUser = bot.user;
    
            const GIF = await neko.sfw.poke();
           
            const pokembed = new Discord.MessageEmbed()
            .setColor('#a45fb2')
            .setDescription(`👉 **${Auser.username}** pokes **${HUser.username}**`)
            .setFooter({text: "Poke"})
            .setImage(GIF.url)
            .setTimestamp();
            
     
         message.channel.send({embeds: [pokembed]});
}
})