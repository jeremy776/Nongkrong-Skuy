import { ClientOptions, Client } from 'discord.js';
import CommandManager from "@inBot/Structures/Command/CommandManager";
import EventManager from "@inBot/Structures/Event/EventManager";

export default class InBot extends Client {
  public command = new CommandManager(this);
  public event = new EventManager(this);
  
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