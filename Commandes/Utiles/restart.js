const Discord = require("discord.js")
const config = require("../../config")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "restart",
    description: "Permet de redémarrer le bot",
    utilisation: "",
    alias: ["restart"],
    permission: "Développeur",
    category: "Système",
    cooldown: 10,

    async run(bot, message, args, db) {

        message.channel.send("🕙 Reboot en cours ...").then(async msg => {
            msg.edit("🕙 Reboot en cours ...")
            bot.destroy();
            await bot.login(config.token);
            await msg.edit("🕙 Reboot en cours ...")
            msg.edit("✅ Reboot bien effectué")
        })
    }
})