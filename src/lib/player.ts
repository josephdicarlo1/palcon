export type Player = {
  name: string;
  playerUid: string;
  steamId: string;
};

export function parsePlayers(data: string) {
  const playerRows = data
    .split('\n')
    .slice(1)
    .filter((row) => row != '');
  let players: Array<Player> = [];
  if (playerRows.length > 0) {
    players = playerRows.map((row: string) => {
      const values = row.split(',');
      return {
        name: values[0],
        playerUid: values[1],
        steamId: values[2],
      } as Player;
    });
  }
  return players;
}
