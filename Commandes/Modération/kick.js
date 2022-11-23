const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "kick",
    description: "Permet d'expulser un utilisateur",
    utilisation: "[membre] (raison)",
    alias: ["kick"],
    permission: Discord.Permissions.FLAGS.KICK_MEMBERS,
    category: "Modération",
    cooldown: 5,

    async run(bot, message, args, db) {

        let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
        if(!user) message.reply("Aucune personne trouvée !")

        let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
        if(!reason) reason = "Aucune raison donnée";

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply("Vous ne pouvez pas vous expulser vous-même !")
        if(user.id === message.guild.ownerId) return message.reply("Vous ne pouvez pas expulser cette personne !")
        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply("Vous ne pouvez pas expulser cette personne !")

        const ID = await bot.function.createID("KICK")
        const kickembedmp = new Discord.MessageEmbed()
        .setTitle("Kick")
        .setColor('ORANGE')
        .setDescription(`Vous avez été **kick** de Lunya pour les raisons suivantes : **${reason}**`)

        try {
            await user.send({embeds: [kickembedmp]})
        } catch (err) {}

        const kickembed = new Discord.MessageEmbed()
        .setTitle("Kick")
        .setColor("ORANGE")
        .setDescription(`${user} a été kick pour les raisons suivantes : **${reason}**\nKick par ${message.user === undefined ? message.author : message.user}`)

        await message.reply({embeds: [kickembed]})

        await message.guild.members.cache.get(user.id).kick(`${reason} (Banni par ${message.user === undefined ? message.author.tag : message.user.tag})`)

        if(reason.includes("'")) reason = reason.replace(/'/g, "\\'")
    }
})