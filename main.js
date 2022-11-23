const Client = require("./Structure/Client")
const Discord = require("discord.js")
const bot = new Client();
const bdd = require("./bdd.json")
require("dotenv").config()
const { token } = require("./config");
const prefix = bdd.prefix;
const AntiSpam = require("discord-anti-spam");
let antiSpam = new AntiSpam({
  warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
  muteThreshold: 8,
  kickThreshold: 10, // Amount of messages sent in a row that will cause a ban.
  banThreshold: 15, // Amount of messages sent in a row that will cause a ban.
  maxInterval: 3000, // Amount of time (in milliseconds) in which messages are considered spam.
  warnMessage: '{@user}, arrête de spam s\'il te plaît.', // Message that will be sent in chat upon warning a user.
  muteMessage: '**{user_tag}** a été mute pour spam',
  kickMessage: '**{user_tag}** a été kick pour spam.', // Message that will be sent in chat upon kicking a user.
  banMessage: '**{user_tag}** a été banni pour spam.', // Message that will be sent in chat upon banning a user.
  maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
  exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
  ignoreBots: true, // Ignore bot messages.
  verbose: true, // Extended Logs from module.
  ignoredUsers: [], // Array of User IDs that get ignored.
  // And many more options... See the documentation.
  })

if (bdd.antispam === 'off') {
  antiSpam = new AntiSpam({})
}


//////////////////      Ghost Ping      /////////////////////

bot.on("messageDelete", async message => {

  
    if(bdd.antigp === "on") {
        
            if(message.author.bot) return;

    if(message.content && message.content.includes("<@")){
        const embedgp = new Discord.MessageEmbed()
        .setColor("2f3136")
        .setAuthor({name: "Ghostping", iconURL: message.author.displayAvatarURL({dynamic: true})})
        .addField(`Contenu du ghostping`, message.content.length < 1024 ? message.content : 'Contenu du message trop long.')
        .addField("Membre ayant ghostping", `<@!${message.author.id}>`)
        message.channel.send({embeds: [embedgp]})
    }
}
    
    
})

bot.on("messageUpdate", async (oldMessage, newMessage) => {
  

    if(bdd.antigp === "on") {
        
        
    if(oldMessage.author.bot) return;

    if(oldMessage.content && oldMessage.content.includes("<@")){
        const embedgp = new Discord.MessageEmbed()
        .setColor("2f3136")
        .name({text:"Ghostping",iconURL: oldMessage.author.displayAvatarURL({dynamic: true})})
        .addField(`Contenu du ghostping`, oldMessage.content.length < 1024 ? oldMessage.content : 'Contenu du message trop long.')
        .addField("Membre ayant ghostping", `<@!${oldMessage.author.id}>`)

        oldMessage.channel.send({embeds: [embedgp]})
    }

    }
})


     //==============================         SSNIPE    ==========================================
     bot.snipes = new Map()
     bot.on('messageDelete', function(message, channel){
       
       bot.snipes.set(message.channel.id, {
         content:message.content,
         author:message.author,
         image:message.attachments.first() ? message.attachments.first().proxyURL : null
       })
       
     })
     
     
     //==============================         LPB CMD    ==========================================
bot.on('messageCreate', async (message) => {
     if(message.content.startsWith(`${prefix}lpb`)) {
       
      let emojis = message.guild.emojis.cache.filter(e => e.name.endsWith('LPB'))
      emojis = emojis.toJSON();
       if (!emojis || !emojis.length) return message.reply("Aucun emoji")
       let random = Math.floor(Math.random() * emojis.length)
       let response = emojis[random];
       message.reply(`<${response.animated ? "a" : ""}:${response.name}:${response.id}>`)
     }
  })

bot.on('messageCreate', async (message) => {

  if(message.channel.id === "927988713542262796") return;

//==============================ANTI SPAM 

 antiSpam.message(message)

//==============================     ANTI LIENS     ==============================  

if(bdd.antilink === "on") {

const Membre = message.mentions.users.first() || message.author

if(message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.MANAGE_GUILD))) return;

const Lien = ["discord.gg", "discord.com/invite", "discordapp.com/invite"]
if(Lien.some (word => message.content.toLowerCase().includes("zocian"))) return;
const AntiLien = new Discord.MessageEmbed()
.setAuthor({name: "Lien detecté", iconURL: message.author.displayAvatarURL({dynamic: true})})
.setDescription(`${Membre} les liens sont interdits.`)
.setColor("#2f3136")
if(Lien.some (word => message.content.toLowerCase().includes(word))) {
  message.delete(), message.channel.send({embeds : [AntiLien]})
}


}


// ==============================     BLACKLIST   ==============================  

const embed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setDescription(`${message.author}, vous avez utilisé un mot qui fait parti de la **blacklist** !`)
  
let blacklisted = ["pd", "nègre", "negre", "negro", "négro", "bamboula", "UwU", "pédé", "Pd"]
let foundInText = false;
if(message.content.includes("pdp")) return;
for(var i in blacklisted) {
if(message.content.toLocaleLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
}
if (foundInText){
  message.delete(), message.channel.send({embeds : [embed]})
}

})




bot.start(token)