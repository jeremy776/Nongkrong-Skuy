import Client from "@inBot/Structures/Client";
import Event from "@inBot/Structures/Event/Event";

export default class MessageCreateEvent extends Event {
    constructor(protected client: Client) {
        super(client, {
            name: "messageCreate"
        })
    }
    
    async run(message: import("discord.js").Message): Promise<void> {
        try {
            if(message.author.bot) return;
            if(message.channel.type === 'DM') return;

            if(!message.content.toLowerCase().startsWith(this.client.options.prefix)) return;
            const [commandName, ...args] = message.content.slice(this.client.options.prefix.length).split(/\s+/);
            const command = this.client.command.commands.get(commandName.toLocaleLowerCase());
            if(!command) return;
            console.log(this.client.options.owners);
            if(command.devOnly && !this.client.options.owners.includes(message.author.id)) return;

            command.run(message, args);
        } catch(e) {
            console.log(e)
        }
    }
}