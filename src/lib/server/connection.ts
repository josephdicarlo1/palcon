import net from 'net';
import crypto from 'crypto';
import {
  SERVERDATA_AUTH,
  SERVERDATA_AUTH_RESPONSE,
  SERVERDATA_EXECCOMMAND,
  createRequest,
  readResponse,
  type RconResponse,
} from './rcon';

export class RconConnection {
  client: net.Socket = new net.Socket();
  connected: boolean = false;
  connectedWithoutError: boolean = false;
  authenticated: boolean = false;
  callback: Function | null = null;

  constructor() {
    this.client.on('data', (data) => {
      const response = readResponse(data);
      if (this.callback) this.callback(response);
    });

    this.client.on('error', (err) => {
      console.error('RCON:', err);
      this.client.destroy(err);
      this.connectedWithoutError = false;
    });

    this.client.on('close', () => {
      this.callback = null;
      this.connected = false;
      this.authenticated = false;
    });
  }

  async connect(hostname: string, port: number, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.client.connect(port, hostname, async () => {
        this.connected = true;
        try {
          // extra response handler to catch failed authentication, which returns message ID -1
          const res = await this.exec(password, SERVERDATA_AUTH);
          if (res.id == -1) {
            throw Error('Authentication failed!');
          }
          this.authenticated = true;
          if (!this.connectedWithoutError) {
            console.log(`RCON: Connected to ${hostname}:${port}`);
            this.connectedWithoutError = true;
          }
          resolve();
        } catch (err: any) {
          console.error('Connection failed', err);
          this.client.destroy(err);
          reject(err);
        }
      });
    });
  }

  async exec(
    body: string,
    type: number = SERVERDATA_EXECCOMMAND,
    messageId: number = this.randU32Sync()
  ): Promise<RconResponse> {
    return new Promise((resolve, reject) => {
      try {
        this.callback = async (res: RconResponse) => {
          resolve(res);
        };
        this.client.write(createRequest(type, messageId, body));
      } catch (err) {
        console.error('RCON: Command send failed', err);
        reject(err);
      }
    });
  }

  private randU32Sync(): number {
    return Math.abs(crypto.randomBytes(4).readInt32LE(0));
  }
}
