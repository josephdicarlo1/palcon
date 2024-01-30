import { RCON_HOSTNAME } from '$env/static/private';
import { RCON_PORT } from '$env/static/private';
import { RCON_PASSWORD } from '$env/static/private';
import { RconConnection } from '$lib/server/connection';
import { json } from '@sveltejs/kit';

const rconConnection = new RconConnection();

export async function GET() {
  if(!rconConnection.connected) {
    await rconConnection.connect(RCON_HOSTNAME, Number(RCON_PORT), RCON_PASSWORD);
  }

  const info = (await rconConnection.exec("Info")).body;
  const players = (await rconConnection.exec("ShowPlayers")).body;

  return json({
    info: info,
    players: players,
  });
}
