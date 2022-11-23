const Discord = require("discord.js")
const Event = require("../../Structure/Event")


module.exports = new Event("guildMemberAdd", async (bot, member) => {


    const db = require(`../../serveur/${member.guild.id}`)
    const channel = db.general
    const embed = new Discord.MessageEmbed()
    .setTitle("Bienvenue !")
    .setColor("PURPLE")
    .setFooter({text:"Dites bonjour!",iconURL: member.user.displayAvatarURL({size: 512})})
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    .setDescription(`<a:PikachuGirl:930864091071914055> **Bienvenue <@${member.user.id}> sur ${member.guild.name} !**\n\n<a:stars2:930864240485609542> **N'oublie pas de lire le <#927981897114615918> et de prendre tes <#927983199995453481> ^^**`)

    bot.channels.cache.get(channel).send({content: `<@${member.user.id}>`, embeds: [embed]})
})


