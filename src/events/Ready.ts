import Client from "@nongsky/Structures/Client";
import Event from "@nongsky/Structures/Event/Event";

export default class ReadyEvent extends Event {
  constructor(protected client: Client) {
    super(client, {
      name: "ready"
    })
  }
  
  async run(): Promise<void> {
    console.log('Ready!');
    this.client.user?.setActivity(`Nongkrong Skuy | discord.gg/NongSky`, { type: "WATCHING" });
  }
}