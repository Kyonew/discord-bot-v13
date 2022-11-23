const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "avatar",
    description: "Afficher l'avatar d'une personne",
    utilisation: "<mention>",
    alias: ["avatar", "pp", 'pdp'],
    permission: "Aucune",
    category: "Information",
    cooldown: 5,

    async run(bot, message, args, db) {

        let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
    let embed = new Discord.MessageEmbed()
        .setColor(`PURPLE`)
        .setDescription(`**${user.username}'s** avatar :`)
        .setImage(avatar)
        .setFooter({text: 'Avatar'})
        .setTimestamp();
    message.channel.send({embeds: [embed]});
    }
})