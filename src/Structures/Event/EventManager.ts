import Client from "@inBot/Structures/Client";
import fs from "fs";
import path from "path";

export default class EventManager {
  constructor(protected client: Client) {}
  
  async load() {
    try {
      const files = fs.readdirSync(path.join(__dirname, "..", "..", "events"), {
        withFileTypes: true,
      });
      files.forEach((e) => {
        const EventImport = require(`../../events/${e.name}`).default;
        const Event = new EventImport(this.client);
        console.log(`Load event ${Event.name}`)
        this.client.on(Event.name, (...params) => Event.run(...params));
      });
      
    } catch(e) {
      console.log("Failed to load", e)
    }
  }
}