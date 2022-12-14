const Discord = require("discord.js");
const fs = require("fs")
const intents = new Discord.Intents(32767);
const Command = require("./Command");
const Event = require("./Event");

class Client extends Discord.Client {

    constructor(options) {

        super({ intents });

        /**
         * @type {Discord.Collection<string, Command>}
        */

        this.commands = new Discord.Collection()
        this.cooldown = new Discord.Collection()
        this.alias = new Discord.Collection()
        this.color = "#2f3136";
        this.function = {
            createID: require("../Fonctions/createID")
        }
    }

    async start(token) {
        
        fs.readdirSync("./Commandes/").forEach(dirs => {
        fs.readdirSync(`./Commandes/${dirs}`).filter(file => file.endsWith(".js")).forEach(async f => {
      
            /**
             * @type {Command} 
            */

            let props = require(`../Commandes/${dirs}/${f}`);
            console.log(`${f} commande chargée avec succès !`);
            this.commands.set(props.name, props)
            if(props.alias.length !== 0) {
                props.alias.forEach(async a => {
                    this.alias.set(a, props)
                })
            }
        })
    })

        fs.readdirSync("./Events/").forEach(dirs => {
    
            fs.readdirSync(`./Events/${dirs}/`).filter(files => files.endsWith(".js")).forEach(async evt => {

                /**
                 * @type {Event}
                */

                const event = require(`../Events/${dirs}/${evt}`);
                console.log(`${event.event}.js événement chargé avec succès !`)
                this.on(event.event, event.run.bind(null, this));
            })
        });

        this.login(token)
    }
}

module.exports = Client;