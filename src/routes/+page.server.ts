import { parsePlayers } from '$lib/player';

export async function load({ fetch }) {
  const res = await fetch('/api/rcon');
  const json = await res.json();
  return {
    serverName: getServerName(json.info),
    serverVersion: getVersion(json.info),
    players: parsePlayers(json.players),
  };
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
