import Client from "@inBot/Structures/Client";
import Event from "@inBot/Structures/Event/Event";

export default class ReadyEvent extends Event {
  constructor(protected client: Client) {
    super(client, {
      name: "ready"
    })
  }
  
  async run(): Promise<void> {
    console.log('Ready!');
    this.client.user?.setActivity(`help | ${this.client.guilds.cache.size} servers`, { type: "WATCHING" });
  }
}