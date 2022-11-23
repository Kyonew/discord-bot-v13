const Discord = require("discord.js")
const Command = require("../../Structure/Command")
const fs = require("fs")
const bdd = require("../../bdd.json")
module.exports = new Command({

    name: "prefix",
    description: "Permet de changer le préfixe du bot",
    utilisation: "[préfixe]",
    alias: ["prefix", "setprefix", "sp"],
    permission: Discord.Permissions.FLAGS.ADMINISTRATOR,
    category: "Système",
    cooldown: 10,

    async run(bot, message, args, db) {
        function Savebdd() {
            fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
                if (err) message.channel.send("Une erreur est survenue.");
            })
        }

            try {

                const errembed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("**Veuillez indiquer un préfixe !**")

                let prefix = args[0] || args._hoistedOptions[0].value
                if(!prefix) return message.reply({embeds: [errembed]})

                const ancienprefix = bdd.prefix;

                bdd['prefix']=prefix
                Savebdd()

                const embed = new Discord.MessageEmbed()
                .setDescription(`Nouveau prefix défini sur : \`${prefix}\``)
                .setColor("GREEN")

                message.reply({embeds: [embed]})

            } catch (err) {
                const errembed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("**Veuillez indiquer un préfixe !**")

                return message.reply({embeds: [errembed]})
            }
    }
})