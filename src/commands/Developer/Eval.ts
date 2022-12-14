import Client from "@nongsky/Structures/Client";
import { Message, MessageEmbed } from "discord.js";
import Command from "@nongsky/Structures/Command/Command";

interface ParseEval {
    evaled: string;
    type: string | null;
}

export default class EvalCommand extends Command {
    constructor(protected client: Client) {
        super(client, {
            name: "eval",
            description: "Evaluates code",
            devOnly: true,
            category: 'Developer'
        })
    }

    async run(message: Message, args: string[]): Promise<Message | void> {
        try {
            if(!args[0]) throw new TypeError("Please provide code to evaluate");
            let { evaled, type } = await this.parseEval(eval(args.join(" ")));
            let res = typeof evaled === "string" ? evaled : require("util").inspect(evaled, {depth: 0});
            let p = res.replace(new RegExp(`${this.client.options.token}`, 'g'), 'token bot here');

            if(res.length > 2000) {
                return message.channel.send(`${p.substr(0, 2000)}...`);
            }
            let embed = new MessageEmbed()
            .addField(`**Output**`, `\`\`\`js\n${p}\`\`\``)
            .addField(`**Type**`, `\`\`\`js\n${type}\`\`\``);

            return message.reply({embeds: [embed]});
        } catch(err) {
            return message.reply(err.message);
        }
    }

    private async parseEval(code: any): Promise<ParseEval> {
        const isPromise = code instanceof Promise && typeof code.then === "function" && typeof code.catch === "function";

        if(isPromise) {
            code = await code;
            return {
                evaled: code,
                type: this.parseType(code)
            }
        }

        return {
            evaled: code,
            type: this.parseType(code)
        }
    }

    private parseType(code: any): string {
        if(code instanceof Buffer) {
            let length = Math.round(code.length / 1024 / 1024);
            let ic = 'MB';
            if(!length) {
                length = Math.round(code.length / 1024);
                ic = 'KB';
            }
            if(!length) {
                length = Math.round(code.length);
                ic = 'Bytes';
            }
            return `Buffer (${length} ${ic})`;
        }
        return code === null || code === undefined ? "void":code.constructor.name;
    }
}