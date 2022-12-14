import Client from '@nongsky/Structures/Client';
import { Intents } from "discord.js";
import config from "@nongsky/config";

const client = new Client({
  token: config.token,
  prefix: config.prefix,
  owners: ["212218437672370178"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.start();