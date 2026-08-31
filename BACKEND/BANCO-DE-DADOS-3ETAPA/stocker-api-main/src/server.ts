import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { userRoutes } from "./domains/user/user_routes";
import { authRoutes } from "./domains/auth/auth_routes";
import { productRoutes } from "./domains/product/product_routes";
import { stockRoutes } from "./domains/stock/stock_routes";
const app = Fastify({ logger: true });

app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

app.register(authRoutes);
app.register(userRoutes);
app.register(productRoutes);
app.register(stockRoutes);

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`Server listening on ${app.server.address()}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
