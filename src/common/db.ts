import {
  Connection,
  ConnectionManager,
  createConnection,
  getConnectionManager,
} from 'typeorm';
import ormConfig from './config';

export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(name: string): Promise<Connection> {
    let connection: Connection;
    if (this.connectionManager.has(name)) {
      connection = this.connectionManager.get(name);
      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {
      connection = await createConnection(ormConfig);
    }
    return connection;
  }
}
