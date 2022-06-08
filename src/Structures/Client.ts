import { ClientOptions, Client, Collection } from 'discord.js';
import CommandManager from "@inBot/Structures/Command/CommandManager";
import EventManager from "@inBot/Structures/Event/EventManager";
import config from "@inBot/config";

export default class InBot extends Client {
  public command = new CommandManager(this);
  public event = new EventManager(this);
  public config: typeof config = config;
  public categorys: string[] = [];

  constructor(ops: ClientOptions) {
    super(ops);
  }
  async start() {
    try {
      if(!this.options.prefix) throw Error("Invalid prefix");
      this.command.load();
      this.event.load();
      await this.login(this.options.token);
    } catch(e) {
      console.log(e)
    }
  }
}

declare module "discord.js" {
  interface ClientOptions {
    token: string;
    prefix: string;
    owners: string[];
  }
}