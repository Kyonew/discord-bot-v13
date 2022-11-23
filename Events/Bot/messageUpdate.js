const Discord = require("discord.js")
const Event = require("../../Structure/Event")
const bdd = require("../../bdd.json")

module.exports = new Event('messageUpdate', async (bot, message, newMessage) => {
    
        if(bdd.antiselfbot === "on") {
                CheckSelfBot(newMessage);
        }
    

})
async function CheckSelfBot(message){
    if(!message.guild) return;
    if(message.author.id === "934418281194987570") return;
    if(message.author.bot) return;
    if(!message.embeds || message.embeds.length === 0) return;
    if(message.embeds.some(() => embed.type != "rich")) return;
    message.delete().catch(console.warn);
    message.member.ban();
}

