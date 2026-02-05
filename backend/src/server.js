// Server
// import "./game/GameLoop.js";
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import GameGateway from "./gateway/GameGateway.js";

dotenv.config();
const fastify = Fastify({ logger: true });

/** ------ ALLOW ALL ORIGINS ONLY in dev mode; in production set the exact domain ------- */
fastify.register(fastifyCors, {
  origin: "*",
});
const HTTP_PORT = 3000;
const WS_PORT = 5000;

/* ------- ROUTE TO GET THE USER TOKEN ------- */
// GET http://localhost:3000/fake-login?user=user1
fastify.get("/fake-login", async (req, res) => {
  const userId = req.query.user || "user1";
  const token = jwt.sign(
    {
      sub: userId,
      username: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" },
  );
  return { token };
});

/** ------- START THE FASTIFY SERVER OR APP --------- */
const startHttp = async () => {
  try {
    await fastify.listen({ port: HTTP_PORT, host: "0.0.0.0" });
    console.log(`HTTP Fastify running on http://localhost:${HTTP_PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
// Launch the HTTP server
startHttp();

/** -------- START THE GAME GATEWAY */
// Create a GameGateway instance which handles all rooms
// Each room will create it own GameEngine instance
const gameGateway = new GameGateway(WS_PORT);
console.log(`GameGateway Websocket running on ws://localhost:${WS_PORT}`);

