import { Message, MessageEmbed } from 'discord.js';
import Client from '@inBot/Structures/Client';
import Command from '@inBot/Structures/Command/Command';

export default class HelpCommand extends Command {
    constructor(protected client: Client) {
        super(client, {
            name: "help",
            description: "Shows all commands",
        })
    }

    async run(message: Message) {
        const embed = new MessageEmbed();

        // for(let cmd of this.client.categorys) {
        //     embed.addField(cmd, this.client.command.commands.filter(c => c.category === cmd).map(c => `\`${c.name}\``).join(", "));
        // }
    }
}