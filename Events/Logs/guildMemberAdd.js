const {Discord, MessageEmbed} = require("discord.js")
const Event = require("../../Structure/Event")
const bdd = require("../../bdd.json")
module.exports = new Event("guildMemberAdd", async (bot, member) => {

////////  ANTI JOIN/RAID ////////

    const db = bot.db;
    const embed = new MessageEmbed()
    .setColor("RED")
    .setTitle("🛡 Anti-raid")
    .setDescription("Ce serveur est en mode anti-raid.")



        if(bdd.antiraid === "on") {

            try {
                await member.user.send({embeds: [embed]})
            } catch (err) {}

            await member.kick("Mode anti-raid activé")
        }
    
////////  ANTI BOT ////////

  
 

    if(bdd.antibot === "on") {
        
        if(member.user.bot) member.kick();

    }
})