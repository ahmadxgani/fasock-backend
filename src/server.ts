import { Socket } from "socket.io";
import fastify from "fastify";
import { datasource } from "database";
import routes from "router";
import socketIO from "plugins/socket.io";
import handler from "./handler";

export default () => {
  const server = fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    },
  });
  server.register(socketIO, {
    cors: {
      origin: "*",
    },
  });
  routes.map((route) => {
    server.register(route);
  });

  server.ready(async (error) => {
    if (error) console.log(error), process.exit(1);
    await datasource.initialize();
    server.log.info(datasource.isInitialized ? "database connection was successfuly created" : "failed to connect database");
    const onConnection = (socket: Socket) => {
      handler(server.io, socket);
    };
    server.io.on("connection", onConnection);
  });

  return server;
};