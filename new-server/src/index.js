import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";

import config from "./config/index.js";
import { app } from "./server.js";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(
    `Primary ${process.pid} is running at localhost:${config.app.port}`,
  );

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(config.app.port, () => { });
}
