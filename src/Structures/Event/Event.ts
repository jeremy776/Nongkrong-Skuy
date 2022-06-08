import Client from "@inBot/Structures/Client";

export default abstract class Event {
  name: string;

  constructor(protected client: Client, opt: any) {
    this.client = client;
    this.name = opt.name;
  }

  abstract run(...args: unknown[]): void;
}