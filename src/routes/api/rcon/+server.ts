import { env } from '$env/dynamic/private';
import { RconConnection } from '$lib/server/connection';
import { json } from '@sveltejs/kit';

function logAndExit(message: string, code: number = 1): never {
  console.error(message);
  return process.exit(code);
}

function getEnv(name: string): string {
  const value = env[name];
  if (!value) logAndExit(`${name} must be set`);
  return value;
}

function getEnvNumber(name: string): number {
  try {
    return Number(getEnv(name));
  } catch (_) {
    logAndExit(`${name} must be a number (1-65535)`);
  }
}

const RCON_HOSTNAME = getEnv('RCON_HOSTNAME');
const RCON_PORT = getEnvNumber('RCON_PORT');
const RCON_PASSWORD = getEnv('RCON_PASSWORD');

const rconConnection = new RconConnection();

export async function GET() {
  if (!rconConnection.connected) {
    await rconConnection.connect(RCON_HOSTNAME, RCON_PORT, RCON_PASSWORD);
  }

  const info = (await rconConnection.exec('Info')).body;
  const players = (await rconConnection.exec('ShowPlayers')).body;

  return json({
    info: info,
    players: players,
  });
}
