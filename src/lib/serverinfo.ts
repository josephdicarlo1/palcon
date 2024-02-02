import type { Player } from './player';

export type ServerInfo = {
  serverName: string;
  serverVersion: string;
  players: Player[];
};
