import Client from '@inBot/Structures/Client';
import { Intents } from "discord.js";
import config from "@inBot/config";

const client = new Client({
  token: config.token,
  prefix: config.prefix,
  owners: ["428922145108656139"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.start();