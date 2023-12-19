import { initTRPC } from "@trpc/server";
import { Express } from "express";
import z from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";

const TRPC = initTRPC.create();

let log = "Start of Server Logs";

const TRPCRouter = TRPC.router({
  hello: TRPC.procedure.query(() => {
    return { message: "Hello World" };
  }),
  addToLog: TRPC.procedure.input(z.object({ value: z.string() })).mutation(({ input }) => {
    log += `\n${input.value}`;
    return "Success";
  }),
  getLog: TRPC.procedure.query(() => log),
});

export type AppRouter = typeof TRPCRouter;

export function addTRPCToExpressRouter(app: Express) {
  app.use("/trpc", trpcExpress.createExpressMiddleware({ router: TRPCRouter }));
}
