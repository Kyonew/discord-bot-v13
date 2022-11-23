const Discord = require("discord.js")
const Event = require("../../Structure/Event")
const bdd = require('../../bdd.json')            

module.exports = new Event("messageCreate", async (bot, message) => {

      if(message.author.bot) return;

   if(bdd.antiselfbot === "on") {
    CheckSelfBot(message);
}
   async function CheckSelfBot(message){
    if(!message.guild) return;
    if(message.author.bot) return;
    if(!message.embeds || message.embeds.length === 0) return;
    if(message.embeds.some(() => embed != "rich")) return;
    message.delete().catch(console.warn);
    message.member.ban();
    }

        let prefix = bdd.prefix;

        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);

        let commandFile = bot.alias.get(command.slice(prefix.length))

        if(message.content.startsWith(`${prefix}lpb`)) return;
        if(!message.content.startsWith(prefix)) return;
        if(!commandFile) return message.reply(`Cette commande n'existe pas !`)

        if(!bot.cooldown.has(commandFile.name)) {
            bot.cooldown.set(commandFile.name, new Discord.Collection())
        }

        const time = Date.now();
        const cooldown = bot.cooldown.get(commandFile.name);
        const timeCooldown = (commandFile.cooldown || 5) * 1000;

        if(cooldown.has(message.author.id)) {

            const timeRestant = cooldown.get(message.author.id) + timeCooldown;

            if(time < timeRestant) {

                const timeLeft = (timeRestant - time);
                const timeleftembed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`**Veuillez attendre encore \`${(Math.round(timeLeft / 1000 % 60))}\`**s **avant de réutiliser cette commande**`)
               
                return message.reply({embeds: [timeleftembed]})
            }
        }

        cooldown.set(message.author.id, time);
        setTimeout(() => cooldown.delete(message.author.id), timeCooldown);

        if(commandFile.permission === "Développeur" && message.author.id !== "629997277322412032") return message.reply("Vous n'avez pas la permission requise pour exécuter cette commande !")
        if(commandFile.permission !== "Aucune" && commandFile.permission !== "Développeur" && !message.member.permissions.has(new Discord.Permissions(commandFile.permission))) return message.reply("Vous n'avez pas la permission requise pour exécuter cette commande !")

        commandFile.run(bot, message, args)
   



})


