const Discord = require("discord.js")
const { stat } = require("fs")
const { isArgumentsObject } = require("util/types")
const Command = require("../../Structure/Command")
const bdd = require("../../bdd.json")
module.exports = new Command({

    name: "protect",
    description: "Permet de voir les protections actives ou non.",
    utilisation: "",
    alias: ["protect"],
    permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
    category: "Information",
    cooldown: 5,

    async run(bot, message, interaction, db) {

        
        var statutantibot = `\`Inactif\` 🔴`
        var statutgp = `\`Inactif\` 🔴`
        var statutlink = `\`Inactif\` 🔴`
        var statutraid = `\`Inactif\` 🔴`
        var statutsb = `\`Inactif\` 🔴`
        var statutspam = `\`Inactif\` 🔴`


           
            if(bdd.antibot === "on") {
            statutantibot = `\`Actif\` 🟢`
            } 
            if(bdd.antigp === "on") {
                statutgp = `\`Actif\` 🟢`
                } 
            if(bdd.antilink === "on") {
                statutlink = `\`Actif\` 🟢`
                }    
                if(bdd.antiraid === "on") {
                    statutraid = `\`Actif\` 🟢`
                    }       
                    if(bdd.antiselfbot === "on") {
                        statutsb = `\`Actif\` 🟢`
                        }  
                        if(bdd.antispam === "on") {
                            statutspam = `\`Actif\` 🟢`
                            }  
            
     
        const embed = new Discord.MessageEmbed()
        .setTitle("Protection du serveur :")
        .setColor("PURPLE")
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setTimestamp()
        .setDescription(`Voici toutes les protections actives ou non du serveur : \n\n **__Anti-bot :__**\n ${statutantibot}\n **__Anti-ghostping :__**\n ${statutgp}\n **__Anti-lien :__**\n${statutlink}\n **__Anti-raid__** *(anti-join)*\n${statutraid}\n **__Anti-selfbot :__**\n${statutsb}\n **__Anti-spam :__**\n${statutspam}`)
        .setFooter({text:"Lunya Protect",iconURL: bot.user.displayAvatarURL({dynamic: true})})

        message.reply({embeds: [embed]})
      }
})