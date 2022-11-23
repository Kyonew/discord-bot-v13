const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "ping",
    description: "Permet de connaître la latence du bot",
    utilisation: "",
    alias: ["ping"],
    permission: "Aucune",
    category: "Information",
    cooldown: 5,

    async run(bot, message, interaction) {

            const startTime = Date.now()

            const embed11 = new Discord.MessageEmbed()
            .setTitle("Calcul...")
            
            //await message.reply(`En cours...`).then(async msg => {
            await message.reply({embeds: [embed11]}).then(async msg => {

                const endTime = Date.now()
                const embed = new Discord.MessageEmbed()
                .setColor("PURPLE")
                .setTitle("Pong! 🏓")
                .setTimestamp()
                .setDescription(`\`\`\`py\nPing : ${endTime - startTime} ms\nAPI : ${bot.ws.ping} ms\n\`\`\``)


                try {
                    msg.edit({embeds: [embed]})
                    //await msg.edit(`\`Latence du bot\` : ${endTime - startTime}ms\n\`Latence de l'API de Discord\` : ${bot.ws.ping}ms\n\`Latence de la base de données\` : ${endTimeDB - startTimeDB}ms`)
                } catch (err) {
                    message.editReply({embeds: [embed]})
                    //await message.editReply(`\`Latence du bot\` : ${endTime - startTime}ms\n\`Latence de l'API de Discord\` : ${bot.ws.ping}ms\n\`Latence de la base de données\` : ${endTimeDB - startTimeDB}ms`)
                }
        })
    }
})