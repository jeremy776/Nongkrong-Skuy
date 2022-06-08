import Client from "@inBot/Structures/Client";
import Event from "@inBot/Structures/Event/Event";

export default class ReadyEvent extends Event {
  constructor(protected client: Client) {
    super(client, {
      name: "ready"
    })
  }
  
  run(): {
    console.log(`Login to ${this.client.user?.tag}`);
  }
  
}