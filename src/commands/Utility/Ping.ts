import Client from "@nongsky/Structures/Client";
import { Message } from "discord.js";
import Command from "@nongsky/Structures/Command/Command";

export default class PingCommand extends Command {
  constructor(protected client: Client) {
    super(client, {
      name: "ping",
      category: 'Utility'
    })
  }
  
  async run(message: Message, args: string[]): Promise<Message | void> {
    return message.reply(`${this.client.ws.ping}ms`);
  } 
}