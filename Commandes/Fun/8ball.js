const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "8ball",
    description: "Posez une question au bot",
    utilisation: "[question]",
    alias: ["8ball", "8b"],
    permission: "Aucune",
    category: "Fun",
    cooldown: 3,

    async run(bot, message, args, db) {

        if(!message.guild) return;
        let q;
        if(message.content.includes("8b")) q = 3
        if(message.content.includes("8ball")) q = 6
        let question = message.content.slice(q)
        if (!question)
          return message.channel.send(`❌ Vous n'avez pas précisé votre question!`);
        else {
          let responses = [
            "Essaye plus tard",
            "Essaye encore",
            "Pas d'avis",
            "C'est ton destin",
            "Le sort en est jeté",
            "Une chance sur deux",
            "Repose ta question",
            "D'après moi oui",
            "C'est certain",
            "Oui absolument",
            "Tu peux compter dessus",
            "Sans aucun doute",
            "Très probable",
            "Oui",
            "C'est bien parti",
            "C'est non",
            "Peu probable",
            "Faut pas rêver",
            "N'y compte pas",
            "Impossible"
          ];
          let response =
            responses[Math.floor(Math.random() * responses.length - 1)];
          let Embed = new Discord.MessageEmbed()
            .setAuthor({name: "🎱 8Ball",iconURL: message.author.avatarURL({ dynamic: true })})
            .setDescription(`**Question:**\n ${question} \n\n**Réponse:**\n ${response}`)
            .setColor('BLACK')
            .setTimestamp()  
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic : true })})
            message.channel.send({embeds: [Embed]});
        }
}
})