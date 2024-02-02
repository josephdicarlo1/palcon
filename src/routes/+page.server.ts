import type { ServerInfo } from '$lib/serverinfo';
import { parsePlayers } from '$lib/player';
import { error } from '@sveltejs/kit';

export async function load({ fetch }): Promise<ServerInfo> {
  try {
    const res = await fetch('/api/rcon');
    const json = await res.json();
    if (!res.ok) {
      console.error(`Server returned ${res.status}: ${res.statusText}`);
      error(500, 'Failed to request status from server');
    }
    return {
      serverName: getServerName(json.info),
      serverVersion: getVersion(json.info),
      players: parsePlayers(json.players),
    };
  } catch (err) {
    console.error('Error trying to fetch:', err);
    error(500, 'Failed to request status from server');
  }
}

const versionRegex = /(?<=\[).+?(?=\])/;
const serverNameRegex = /(?<=\] ).*/;

function getVersion(data: string) {
  const version = data.match(versionRegex);
  if (version) return version[0];
  return 'Unknown';
}

function getServerName(data: string) {
  const version = data.match(serverNameRegex);
  if (version) return version[0];
  return 'Unknown';
}
