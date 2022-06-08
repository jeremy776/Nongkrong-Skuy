import { Message } from "discord.js";
import Client from "@inBot/Structures/Client";

export default abstract class Command {
  constructor(protected client: Client, ops: any) {
    this.client = client;
    this.name = ops.name;
    this.cooldown = ops.cooldown || 5;
    this.description = ops.description || "No description";
    this.devOnly = ops.devOnly || false;
  }
  abstract run(message: Message, args: string[]): void;
}