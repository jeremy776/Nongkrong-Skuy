import { Message } from "discord.js";
import Client from "@nongsky/Structures/Client";

export default abstract class Command {
  name: string;
  cooldown: number;
  description: string;
  devOnly: boolean;
  category: string;

  constructor(protected client: Client, ops: any) {
    this.client = client;
    this.name = ops.name;
    this.cooldown = ops.cooldown || 5;
    this.category = ops.category;
    this.description = ops.description || "No description";
    this.devOnly = ops.devOnly || false;
  }
  abstract run(message: Message, args: string[]): void;
}