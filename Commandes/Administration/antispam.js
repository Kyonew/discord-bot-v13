const Discord = require("discord.js")
const Command = require("../../Structure/Command")
const fs = require("fs")
const bdd = require("../../bdd.json")
module.exports = new Command({

    name: "antispam",
    description: "Permet d'activer ou de désactiver le mode anti-liens",
    utilisation: "[on/off]",
    alias: ["antispam"],
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
        .setTitle("Anti-spam")
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
        .setDescription("🟢 **L'anti-spam a bien été activé !**")
        const desacembed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("🔴 **L'anti-spam a bien été désactivé !**")

        message.reply({embeds: [embed], components: [aaa, ooo]}).then(async msg => {



        const filter = async() => true;
        const collector = msg.createMessageComponentCollector({filter})

        collector.on("collect", async button => {

            if(!button.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.BAN_MEMBERS))) return button.reply({content: "Vous n'avez pas la permission requise pour cliquer sur ce bouton !", ephemeral: true})

            if(button.customId === "active") {

                if(bdd.antispam === 'on') {
                    message.reply(`L'anti-spam est déjà activé !`)
                    return collector.stop()

                } else {
                    bdd['antispam']="on"
                    Savebdd()
                }


                await button.reply({embeds: [activeembed]})

                await collector.stop()
            }
            if (button.customId === "desactive") {
                if(bdd.antispam === 'off') {
                        message.reply(`L'anti-spam est déjà désactivé !`)                 
                        return collector.stop()
                } else{
                    bdd["antispam"]="off"
                }    
                await button.reply({embeds: [desacembed]})
            }
       
        })
        
        })
}
})