const Discord = require("discord.js")
const Command = require("../../Structure/Command")
const fs = require("fs")
const bdd = require("../../bdd.json")
module.exports = new Command({

    name: "antiraid",
    description: "Permet d'activer ou de désactiver le mode anti-raid",
    utilisation: "[on/off]",
    alias: ["antiraid", "raid"],
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "Administration",
    cooldown: 5,

    async run(bot, message, args, db) {
        function Savebdd() {
            fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
                if (err) message.channel.send("Une erreur est survenue.");
            })
        }
        const embed = new Discord.MessageEmbed()
        .setTitle("Anti-raid")
        .setColor("PURPLE")
        .setDescription("**Que voulez-vous faire ?**") 
        const aaa = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Activer")
        .setCustomId("active")
        .setEmoji("🟢"))
        const ooo = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
        .setStyle("DANGER")
        .setLabel("Désactiver")
        .setCustomId("desactive")
        .setEmoji("🔴"))
        const activeembed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription("🟢 **L'anti-raid a bien été activé !**")
        const desacembed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("🔴 **L'anti-raid a bien été désactivé !**")

        message.reply({embeds: [embed], components: [aaa, ooo]}).then(async msg => {



        const filter = async() => true;
        const collector = msg.createMessageComponentCollector({filter})

        collector.on("collect", async button => {

            if(!button.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.BAN_MEMBERS))) return button.reply({content: "Vous n'avez pas la permission requise pour cliquer sur ce bouton !", ephemeral: true})

            if(button.customId === "active") {

                if(bdd.antiraid === 'on') {
                    message.reply(`L'anti-raid est déjà activé !`)
                    return collector.stop()

                } else {
                    bdd['antiraid'] = "on"
                    Savebdd()
                }


                await button.reply({embeds: [activeembed]})

                await collector.stop()
            }
            if (button.customId === "desactive") {
                if(bdd.antiraid === 'off') {
                        message.reply(`L'anti-raid est déjà désactivé !`)                 
                        return collector.stop()
                } else {
                    bdd['antiraid'] = "off"
                    Savebdd()
                }    
                await button.reply({embeds: [desacembed]})
            }
       
        })
        })
     }
})