const Discord = require("discord.js")
const Command = require('../../Structure/Command')
const bdd = require("../../bdd.json")
module.exports = new Command({

    name: "help",
    description: "Permet de connaître toutes les commandes du bot",
    utilisation: "",
    alias: ["help", "h", "aide"],
    permission: "Aucune",
    category: "Information",
    cooldown: 2,

    async run(bot, message, args, db) {

         const command = message.user ? bot.alias.get(args._hoistedOptions.length !== 0 ? args._hoistedOptions[0].value : "") : bot.alias.get(args[0])
        
        

           if(!command) {
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Selectionnez la catégorie')
            .addOptions([
                {
                    label: "Administration",
                    description: "Affiche les commandes administratives",
                    value: "first",
                    emoji: "<:admin:937054030193111060>"
                },
                {
                    label: "Fun",
                    description: "Affiche les commandes fun",
                    value: "second",
                    emoji: "<:fun:937055763346620476>"
                },
                {
                    label: "Modération",
                    description: "Affiche les commandes de modération",
                    value: "third",
                    emoji: "<:modo:937055766249078825>"
                },
                {
                    label: "Discord Together",
                    description: "Jeux et activités à plusieurs !",
                    value: "four",
                    emoji: "<:together:937055766949535785>"
                },
                {
                    label: "Informations",
                    description: "Affiche les commandes d'informations",
                    value: "five",
                    emoji: "<:info:937055766827917312>"
                },
                {
                    label: "Misc",
                    description: "Affiche les commandes misc",
                    value: "six",
                    emoji: "<:misc:937055766723051611>"
                },
                {
                    label: "Utiles",
                    description: "Affiche les commandes utiles",
                    value: "seven",
                    emoji: "<:utils:937055766886621195>"
                },
                {
                    label: "Développeur",
                    description: "Commandes accessible au développeur du bot",
                    value: "eight",
                    emoji: "<:dev:937057618248216616>"
                }
                
            ])
        )

        let embed = new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setFooter({text: "Lunya Help", iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setTimestamp()
        .addFields(
            {
                name: '<:cate:937053231148847145> Catégories :', value: "** > <:admin:937054030193111060> Administration\n> <:fun:937055763346620476> Fun\n> <:modo:937055766249078825> Modération\n> <:together:937055766949535785> Discord Together**", inline: true
            },
            {
                name: "ㅤ", value: "** > <:info:937055766827917312> Informations\n> <:misc:937055766723051611> Misc\n> <:utils:937055766886621195> Utiles\n> <:dev:937057618248216616> Développeur**", inline: true
            })
        .setDescription(`Bienvenue dans le menu d'aide!\nIci, mon prefix est : \`${bdd.prefix}\`\n\n- Utilisez \`help <command>\` pour avoir de l'aide sur une commande.\n\n`)
        .setTitle("Centre d'aide")

        let sendmsg = await message.channel.send({content: ' ', ephemeral:true, embeds:[embed], components:[row]})

        let adminembed = new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setDescription("Voici la liste des commandes administratives :")
        .addField('Commandes :', '<:arrow:937120718011916319> `antibot` - Active/Désactive l\'anti-bot\n<:arrow:937120718011916319> `antigp` - Active/Désactive l\'anti-ghostping\n<:arrow:937120718011916319> `antilink` - Active/Désactive l\'anti-lien\n<:arrow:937120718011916319> `antiraid` - Active/Désactive l\'anti-raid\n<:arrow:937120718011916319> `antiselfbot` - Active/Désactive l\'anti-selfbot\n<:arrow:937120718011916319> `antispam` - Active/Désactive l\'anti-spam\n<:arrow:937120718011916319> `prefix` - Change le prefix du bot')
        .setThumbnail("https://media.discordapp.net/attachments/899320565582680096/937118562273857657/2031036.png")
        .setTitle("Commandes admin")
       
        let funembed = new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setDescription("Voici la liste des commandes fun")
        .addField("Commandes :", "<:arrow:937120718011916319> `8ball` - Posez une question au bot!\n<:arrow:937120718011916319> `dance` - Dancez !\n<:arrow:937120718011916319> `hug` - Faites un câlin à quelqu'un\n<:arrow:937120718011916319> `kiss` - Faites un bisou à quelqu'un\n<:arrow:937120718011916319> `poke` - Embêtez une personne\n<:arrow:937120718011916319> `slap` - Donnez une claque bien méritée !\n<:arrow:937120718011916319> `tickle` - Chatouillez quelqu'un")
        .setThumbnail("https://media.discordapp.net/attachments/899320565582680096/937118563272122368/fun.png")
        .setTitle("Commandes fun")
       
        let modoembed = new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setDescription("Voici la liste des commandes de modération")
        .addField("Commandes :", "<:arrow:937120718011916319> `Ban` - Bannir un utilisateur\n<:arrow:937120718011916319> `clear` - Supprime un nombre de message donné\n<:arrow:937120718011916319> `kick` - Expulse un utilisateur du serveur")
        .setFooter({text:"Cette catégorie n'est pas complète."})
        .setThumbnail("https://media.discordapp.net/attachments/899320565582680096/937118564261961828/modo.png")
        .setTitle("Commandes de modération")
       
        let diditogether = new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setDescription("Voici la liste des commandes Discord Together")
        .addField("Commandes :", "<:arrow:937120718011916319> `betrayal` - Jouez à Betrayal !\n<:arrow:937120718011916319> `poker` - Permet de jouer au poker\n<:arrow:937120718011916319> `youtube` - Ouvre YouTube dans Discord")
        .setFooter({text:"D'autres jeux et activités arrivent."})
        .setThumbnail("https://media.discordapp.net/attachments/899320565582680096/937118564551372811/together.png")
        .setTitle("Commandes de Discord Together")
       
        let infoembed = new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setDescription("Voici la liste des commandes d'informations")
        .addField("Commandes :", "<:arrow:937120718011916319> `avatar` - Renvoie l'avatar d'une personne\n<:arrow:937120718011916319> `protect` - Affiche les protections actives du serveur\n<:arrow:937120718011916319> `userinfo` - Affiche des informations concernant un utilisateur")
        .setThumbnail("https://media.discordapp.net/attachments/899320565582680096/937118563657986079/info.png")
        .setFooter({text:"D'autres commandes arrivent !"})
        .setTitle("Commandes d'informations")
       
        let miscembed = new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setDescription("Voici la liste des commandes misc")
        .addField("Commandes :", "<:arrow:937120718011916319> `help` - Affiche le centre d'aide\n<:arrow:937120718011916319> `lpb` - Renvoie une pancarte LPB aléatoire\n<:arrow:937120718011916319> `ping` - Affiche le ping du bot")
        .setThumbnail("https://media.discordapp.net/attachments/899320565582680096/937118563972546640/misc.png")
        .setFooter({text:"On attend vos suggestions !"})
        .setTitle("Commandes misc")
       
        let utilembed = new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setDescription("Voici la liste des commandes utiles")
        .addField("Commandes :", "<:arrow:937120718011916319> `reload` - Permet de recharger une commande\n<:arrow:937120718011916319> `restart` - Redémarre le bot\n<:arrow:937120718011916319> `snipe` - Snipe un message supprimé\n<:arrow:937120718011916319> `stop` - Arrête le bot")
        .setThumbnail("https://media.discordapp.net/attachments/899320565582680096/937118564756881418/utils.png")
        .setTitle("Commandes utiles")

        let devembed = new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setDescription("Voici les commandes Développeur\n*Ces commandes vous sont inutiles*")
        .addField("Commandes :", "<:arrow:937120718011916319> `eval` - Emule un événement")
        .setThumbnail("https://media.discordapp.net/attachments/899320565582680096/937118562886230106/admin.png")
        .setTitle("Commandes développeur")

         const collector = message.channel.createMessageComponentCollector({
            componentType: "SELECT_MENU"
        })

        collector.on('collect', async (collected)=>{
            const value = collected.values[0]

            if(value === "first") {
               sendmsg.edit({embeds: [adminembed], ephemeral:true})
              collected.deferUpdate() 

            }
            if(value === "second") {
                sendmsg.edit({embeds: [funembed], ephemeral:true})
                collected.deferUpdate() 
            }

            if(value === "third") {
                sendmsg.edit({embeds: [modoembed], ephemeral:true})
                collected.deferUpdate() 
            }
            if(value === "four") {
                sendmsg.edit({embeds: [diditogether], ephemeral:true})
                collected.deferUpdate() 
            }
            if(value === "five") {
                sendmsg.edit({embeds: [infoembed], ephemeral:true})
                collected.deferUpdate() 
            }
            if(value === "six") {
                sendmsg.edit({embeds: [miscembed], ephemeral:true})
                collected.deferUpdate() 
            }
            if(value === "seven") {
                sendmsg.edit({embeds: [utilembed], ephemeral:true})
                collected.deferUpdate() 
            }
            if(value === "eight") {
                sendmsg.edit({embeds: [devembed], ephemeral:true})
                collected.deferUpdate() 
            }
        }) 
    }
        if(command) {

                let Embed = new Discord.MessageEmbed()
                 .setColor("PURPLE")
                 .setTitle(`\`${command.name}\``)
                 .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription(`**Nom de la commande** \n${command.name}\n**Description** \n\`${command.description}\`\n**Utilisation** \n\`${message.user ? args._hoistedOptions[0].value : args[0]} ${command.utilisation}\`\n**Alias** \n${command.alias.filter(a => a !== (message.user ? args._hoistedOptions[0].value : args[0])).map(a => `\`${a}\``).join(" ")}\n**Catégorie** \n\`${command.category}\`\n**Permission** \n\`${command.permission}\`\n**Cooldown** \n\`${command.cooldown}\`s`)
                .setTimestamp()
                .setFooter({text: `${message.user ? message.user.username : message.author.username}`, iconURL: message.user ? message.user.displayAvatarURL({dynamic: true}) : message.author.displayAvatarURL({dynamic: true})})

                message.reply({embeds: [Embed]})
        }        
    }
})

        //         const categories = [];
        //         const commands = bot.commands;
        
        //         commands.forEach((command) => {
        //             if(!categories.includes(command.category)) {
        //                 categories.push(command.category);
        //             }
        //         });
    
        //         let Embed = new Discord.MessageEmbed()
        //         .setColor(bot.color)
        //         .setTitle(`Toutes les commandes du bot`)
        //         .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        //         .setDescription("Voici toutes les commandes du bot")
        //         .setTimestamp()
        //         .setFooter(`${message.user ? message.user.username : message.author.username}`, message.user ? message.user.displayAvatarURL({dynamic: true}) : message.author.displayAvatarURL({dynamic: true}))
    
        //         categories.sort().forEach((cat, i) => {
        //             const tCommands = commands.filter((cmd) => cmd.category === cat);
        //             Embed.addField(cat, tCommands.map((cmd) => "> `" + req[0].prefix + cmd.name + "` ➔ " + cmd.description).join("\n"));
        //         });
    
        //         message.reply({embeds: [Embed]})

        //     }