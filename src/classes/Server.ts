import KRPNodeWrapper from 'krp-node-wrapper';
import {Server as SocketServer} from "socket.io";
import fs from "fs";
import path from "path";
import process from "process";
import {ConfigT} from "../types/ConfigT";

const Config: ConfigT = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config.json'), 'utf-8'));

class Server {
  private readonly wrapper: KRPNodeWrapper;
  private readonly io: SocketServer;

  constructor() {
    this.io = new SocketServer(Config.Server.port);

    this.wrapper = new KRPNodeWrapper(
      Config.Connection.hostname,
      Config.Connection.port,
      Config.Connection.password,
      Config.Connection.logging,
    )

    this.wrapper.on('connected', () => console.log("Wrapper connected!"));
    this.wrapper.on('disconnected', () => console.log("Wrapper disconnected!"));
    this.wrapper.on('update', (type, data) => this.io.emit('update', type, data));

    console.log("Server started!")
  }
}

export default Server;