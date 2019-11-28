import {config} from "dotenv";
import * as path from "path"
import {displayEnv} from "dotenv-display"
//Load and display config variables defined in .env file
let configPath = path.join(__dirname, "./.env")
let env = config({path: configPath});
displayEnv(env.parsed)

import { Server} from "./server";
//Load server
const server = new Server();

server.setRoutes();
server.setStaticFolders();
server.setSwagger();
server.setErrorHandlers();
server.startServer();
