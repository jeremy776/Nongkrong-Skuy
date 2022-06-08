import { Collection } from "discord.js";
import Command from "./Command";
import Client from "@inBot/Structures/Client";
import fs from "fs";
import path from "path";

export default class CommandManager {
  public commands: Collection<string, Command> = new Collection();
  
  constructor(protected client: Client) {}
  
  async load(): Promise<void> {
    try {
      const folder = fs.readdirSync(path.join(__dirname, "../../commands"));
      
      folder.forEach((f) => {
        const cmds = fs.readdirSync(path.join(__dirname, "../../commands", f), {
          withFileTypes: true,
        });
        
        cmds.forEach((cmd) => {
          const CommandImport = require(`../../commands/${f}/${cmd.name}`).default;
          const CommandL = new CommandImport(this.client);
          console.log(`Load ${CommandL.name}`);
          this.commands.set(CommandL.name, CommandL);
        });
      });
      //console.log("Commands successfully loaded");
    } catch(e) {
      throw Error(e);
    }
  }
}