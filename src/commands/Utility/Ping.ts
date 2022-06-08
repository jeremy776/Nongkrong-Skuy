import Client from "@inBot/Structures/Client";
import { Message } from "discord.js";
import Command from "@inBot/Structures/Command/Command";

export default class PingCommand extends Command {
  constructor(protected client: Client) {
    super(client, {
      name: "ping"
    })
  }
  
  async run(message: Message, args: string[]): Promise<Message | void> {
    return message.reply("Hello");
  } 
}