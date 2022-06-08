import Client from '@inBot/Structures/Client';
import { Intents } from "discord.js";

const client = new Client({
  token: "NzAyODc0MDI1MTg5MTc5NTMz.GpoaZs.IvbS6onHnTem-jSoKzGw797u4kz6pUklOOYKNY",
  prefix: "k",
  intents: [
    Intents.FLAGS.GUILDS
  ]
});

client.start();