export const SERVERDATA_AUTH = 3;
export const SERVERDATA_AUTH_RESPONSE = 2;
export const SERVERDATA_EXECCOMMAND = 2;
export const SERVERDATA_RESPONSE_VALUE = 0;

export type RconResponse = {
  size: number;
  id: number;
  type: number;
  body: string;
};

export function createRequest(type: number, id: number, body: string): Buffer {
  const size = Buffer.byteLength(body, 'ascii') + 14,
    buffer = Buffer.alloc(size);

  buffer.writeInt32LE(size - 4, 0);
  buffer.writeInt32LE(id, 4);
  buffer.writeInt32LE(type, 8);
  buffer.write(body, 12, size - 2, 'ascii');
  buffer.writeInt16LE(0, size - 2);

  return buffer;
}

export function readResponse(buffer: Buffer): RconResponse {
  return {
    size: buffer.readInt32LE(0),
    id: buffer.readInt32LE(4),
    type: buffer.readInt32LE(8),
    body: buffer.toString('ascii', 12, buffer.length - 2),
  };
}
