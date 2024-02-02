import { env } from '$env/dynamic/private';
import { RconConnection } from '$lib/server/connection';
import { json, error } from '@sveltejs/kit';

function logAndThrow(message: string, code: number = 1): never {
  console.error(message);
  throw Error(message);
}

function getEnv(name: string): string {
  const value = env[name];
  if (!value) logAndThrow(`${name} must be set`);
  return value;
}

function getEnvNumber(name: string): number {
  try {
    return Number(getEnv(name));
  } catch (_) {
    logAndThrow(`${name} must be a number (1-65535)`);
  }
}

const rconConnection = new RconConnection();

export async function GET() {
  if (!rconConnection.connected) {
    try {
      const RCON_HOSTNAME = getEnv('RCON_HOSTNAME');
      const RCON_PORT = getEnvNumber('RCON_PORT');
      const RCON_PASSWORD = getEnv('RCON_PASSWORD');

      await rconConnection.connect(RCON_HOSTNAME, RCON_PORT, RCON_PASSWORD);
    } catch (err: any) {
      return error(500, err.message);
    }
  }

  const info = (await rconConnection.exec('Info')).body;
  const players = (await rconConnection.exec('ShowPlayers')).body;

  return json({
    info: info,
    players: players,
  });
}
