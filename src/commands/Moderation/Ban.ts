import Client from "@nongsky/Structures/Client";
import { Message, MessageEmbed, Permissions } from "discord.js";
import Command from "@nongsky/Structures/Command/Command";

export default class BanCommand extends Command {
    constructor(protected client: Client) {
        super(client, {
            name: 'ban',
            description: "Ban member",
            category: 'Moderation'
        })
    }

    async run(message: Message, args: string[]): Promise<Message | void> {
        
        let notHavePermsEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`**${message.author.username}**, you are not allowed to use this command.`)
        if(!message.member?.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply({embeds: [notHavePermsEmbed]});

        if(!message.guild?.me?.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply('I don\'t have permission \`BANNED_MEMBERS\`');

        let member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0]);
        if(!member) {
            let notMentionMember = new MessageEmbed()
            .setColor('RED')
            .setDescription(`You must mention the member you want to ban`)
            .setFooter({text: `${this.client.config.prefix}ban @member [reason]`})

            return message.reply({embeds: [notMentionMember]});
        }

        if(!member.bannable) return message.reply('You can\'t ban this member.');

        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'No reason.';

        member.ban({reason: reason})
        .then(() => {
            let successBanMember = new MessageEmbed()
            .setColor('GREEN')
            .setFooter({text: `reason: ${reason}`})
            .setTimestamp()
            .addField('Staff', `${message.author} **(${message.author.tag})**`)
            .addField('Member', `${member} **(${member?.user.tag})**`);

            return message.reply({embeds: [successBanMember]});
        })
    }
}