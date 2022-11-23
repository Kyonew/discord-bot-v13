const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "dance",
    description: "Dansez!",
    utilisation: "",
    alias: ["dance", "danse"],
    permission: "Aucune",
    category: "Fun",
    cooldown: 3,

    async run(bot, message, args, db) {

  
        const sayMessage = args.join(' ');

        var list = [
            'https://cdn.zerotwo.dev/DANCE/62ce61da-ed7c-4a85-b05c-bdea0ec30b29.gif',
            'https://cdn.zerotwo.dev/DANCE/d2178bd6-e3ff-44cf-94e7-a1d98b5f1d47.gif',
            'https://cdn.zerotwo.dev/DANCE/0a95dde7-7cd3-4624-a871-9b4d56bdede4.gif',
            'https://media.giphy.com/media/mJIa7rg9VPEhzU1dyQ/giphy.gif',
            'https://media1.tenor.com/images/c925511d32350cc04411756d623ebad6/tenor.gif?itemid=13462237',
            'https://media.giphy.com/media/3ohzdTADgmPfS1teWk/giphy.gif',
            'https://media.giphy.com/media/4hd57A5UcVqGQ/giphy.gif',
            'https://media.giphy.com/media/GYddQzjZC0kvK/giphy.gif',
            'https://media.giphy.com/media/YaTE7QSUtc4co/giphy.gif',
            'https://media.giphy.com/media/J3PFjRm7LB28w/giphy.gif',
            'https://cdn64.picsart.com/189798505001201.gif?to=min&r=640',
            'https://i.pinimg.com/originals/b6/b4/de/b6b4ded4bd797b093cc9b68aa6fba694.gif'
    
        ];
    
        var rand = list[Math.floor(Math.random() * list.length)];
    
        let avatar = message.author.displayAvatarURL({ format: 'png' });
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`🕺 **${message.author.username}** dance `)
            .setImage(rand)
            .setTimestamp()  
            .setFooter({text: bot.user.username,iconURL: bot.user.displayAvatarURL({dynamic : true })})
        await message.channel.send({embeds: [embed]});
    }
})