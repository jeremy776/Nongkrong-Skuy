import { Message, MessageEmbed } from 'discord.js';
import Client from '@nongsky/Structures/Client';
import Command from '@nongsky/Structures/Command/Command';

export default class HelpCommand extends Command {
    constructor(protected client: Client) {
        super(client, {
            name: "help",
            description: "Shows all commands",
            category: 'Utility'
        })
    }

    async run(message: Message) {
        const embed = new MessageEmbed();
        embed.setAuthor({name: `${message.guild?.name}`});
        embed.setColor('#7289da')
        for(let cmd of this.client.categorys) {
            embed.addField(cmd, this.client.command.commands.filter(c => c.category === cmd).map(c => `\`${c.name}\``).join(", "));
        }

        return message.reply({embeds: [embed]})
    }
}