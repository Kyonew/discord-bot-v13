const Event = require("../../Structure/Event");
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { SlashCommandBuilder } = require("@discordjs/builders")
const { token } = require("../../config")

module.exports = new Event("guildCreate", async (bot, guild) => {

    const commands = [

        new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Permet de connaître la latence du bot"),

        new SlashCommandBuilder()
        .setName("prefix")
        .setDescription("Permet de changer le prefix du bot")
        .addStringOption(option => option.setName("prefix").setDescription("Le prefix que le bot doit avoir").setRequired(true)),

        new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Permet de supprimer un nombre de messages")
        .addStringOption(option => option.setName("nombre").setDescription("Le nombre de messages a effacer").setRequired(true)),

        new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Permet de bannir définitivement un utilisateur")
        .addUserOption(option => option.setName("membre").setDescription("Le membre à bannir").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("La raison du bannissement").setRequired(false)),

        new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Permet d'expulser un utilisateur")
        .addUserOption(option => option.setName("membre").setDescription("Le membre à expulser").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("La raison de l'expulsion").setRequired(false)),

        new SlashCommandBuilder()
        .setName("restart")
        .setDescription("Permet de redémarrer le bot !"),

        new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Permet de stopper le bot !"),

        new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Permet d'évaluer un code")
        .addStringOption(option => option.setName("code").setDescription("Le code à évaluer").setRequired(true)),

        new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Permet de recharger une commande")
        .addStringOption(option => option.setName("commande").setDescription("La commande a recharger").setRequired(true)),

        new SlashCommandBuilder()
        .setName("help")
        .setDescription("Permet de connaître toutes les commandes du bot")
        .addStringOption(option => option.setName("commande").setDescription("La commande où vous voulez les informations").setRequired(false)),

        new SlashCommandBuilder()
        .setName("antiraid")
        .setDescription("Permet d'activer ou de désactiver l'anti-raid")
        .addStringOption(option => option.setName("état").setDescription("L'état de l'anti-raid").setRequired(true)),
    ]
      
    const rest = new REST({ version: "9" }).setToken(token)

    await rest.put(Routes.applicationGuildCommands(bot.user.id, guild.id), { body: commands });
})