import express from "express";
import cors from "cors";
import { addTRPCToExpressRouter } from "./trpcRouter.js";
export type { AppRouter } from "./trpcRouter.js";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */

const app = express();

let totalRequestsToServer = 0;

app.use(cors());
app.get("/", (req, res) => {
  totalRequestsToServer = totalRequestsToServer + 1;
  res.json({ message: "Thanks for requesting", totalRequestsToServer });
});

addTRPCToExpressRouter(app);

app.listen(6900, () => {
  console.log("Server started on port 6900");
});
