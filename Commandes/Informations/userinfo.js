const Discord = require("discord.js")
const Command = require("../../Structure/Command")
const moment = require("moment");
const { stat } = require("fs");
module.exports = new Command({

    name: "userinfo",
    description: "Permet de connaître des informations sur un utilisateur",
    utilisation: "",
    alias: ["userinfo", 'ui'],
    permission: "Aucune",
    category: "Information",
    cooldown: 5,

    async run(bot, message, args, db) {
        const flags = {
            DISCORD_EMPLOYEE: "<:staff:930784089382981632>",
            DISCORD_PARTNER: "<:partner:930784086581198908>",
            BUGHUNTER_LEVEL_1: "<:BugHunter:930784087508152371>",
            BUGHUNTER_LEVEL_2: "<:BugHunter2:835192291299557436>",
            HYPESQUAD_EVENTS: "<:HypeSquad:930784086568632340>",
            HOUSE_BRAVERY: "<:bravery:930783519842639882>",
            HOUSE_BRILLIANCE: "<:brillance:930784082688901151>",
            HOUSE_BALANCE: "<:balance:930784080444915733>",
            EARLY_SUPPORTER: "<:earlysupporter:930784094927851520>",
            VERIFIED_DEVELOPER: "<:developper:930784085171925032>"
        };
        
          const nomemb = new Discord.MessageEmbed()
          .setColor('#FF0000')
          .setDescription('❌ **Impossible de trouver cet utilisateur...**')
        
          
          let user;
          if (!args[0]) {
            user = message.member;
          } else {
          
            user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err => { return message.channel.send(nomemb) })
          }
          let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

          const userFlags = member.user.flags.toArray();

            let statut;
            switch (member.presence?.status) {
              case "online":
                statut = "<:online:930555905471287317> En ligne"
                break;
              case "dnd":
                statut = "<:dnd:930555904993144832> Ne pas déranger"
                break;
               case "idle":
                 statut = "<:idle:930555906280787999> Inactif"
                 break;
              case "offline":
                default:
                statut = "<:offline:930555892003385354> Hors ligne" 
                break;
            }
        
            const pseudo = member.user.username
            const badge = `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Aucun badge'}`
            const roles = `${member.roles.cache.map(role => role.toString())}`
            const avatar = `[Cliquez ici](${member.user.displayAvatarURL()})`
            const arejle = `${moment(member.joinedAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss')}`
            const crele = `${moment(member.user.createdTimestamp).format('[Le] DD/MM/YYYY [à] HH:mm:ss')} \n*${moment(member.user.createdTimestamp).fromNow()}*`
            const tag = `#${member.user.discriminator}`

            let UserEmbed = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setTitle(`\`Userinfo\``)
            .setColor('PURPLE')
            .setDescription(`**Voici les informations sur ${member}**`)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
            .addFields(
              { name: 'Pseudo', value: pseudo, inline: true },
               { name: 'Tag', value: tag, inline: true },
              { name: 'ID', value: member.user.id, inline: true },
               { name: 'Compte crée le', value: crele, inline: true },
               { name: 'A rejoint le', value: arejle, inline: true },
               { name: 'Avatar', value: avatar, inline: true },
               { name: 'Rôles', value: roles, inline: true },
             { name: 'Badge(s)', value: badge, inline:true },
              { name: 'Statut', value: statut, inline: true },
              )  
            .setFooter({text: 'Userinfo', iconURL: bot.user.displayAvatarURL({dynamic: true, size: 512})})
            .setTimestamp()
        
            message.channel.send({embeds: [UserEmbed]})

    }
})