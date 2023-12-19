import { useState } from "react";
import { Button } from "./Button";
import type { AppRouter } from "@interview-project/server";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:6900/trpc",
    }),
  ],
});

export function ServerInteraction() {
  const [waiting, setWaiting] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const [toInput, setToInput] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button
          label={waiting ? "Waiting for response..." : "Request From Server"}
          onClick={() => {
            if (waiting) return; // ? Don't double send if waiting
            setWaiting(true);
            fetch("http://localhost:6900/")
              .then((response) => response.json())
              .then((data) => {
                setServerResponse(JSON.stringify(data, null, 2));
                setWaiting(false);
              });
          }}
        />
        <Button
          label={waiting ? "Waiting for response..." : "Hit TRPC Hello Endpoint"}
          onClick={async () => {
            if (waiting) return; // ? Don't double send if waiting
            setWaiting(true);
            const response = await trpc.hello.query();
            setWaiting(false);
            setServerResponse(JSON.stringify(response, null, 2));
          }}
        />
        <Button
          label={waiting ? "Waiting for response..." : "Get Log from Server"}
          onClick={async () => {
            if (waiting) return; // ? Don't double send if waiting
            setWaiting(true);
            const response = await trpc.getLog.query();
            setWaiting(false);
            setServerResponse(response);
          }}
        />
      </div>
      <div>
        <Button
          label={waiting ? "Waiting for response..." : "Add Log to Server"}
          onClick={async () => {
            if (waiting) return; // ? Don't double send if waiting
            setWaiting(true);
            const response = await trpc.addToLog.mutate({ value: toInput });
            setToInput("");
            setWaiting(false);
            setServerResponse(response);
          }}
        />
        <input
          value={toInput}
          onChange={(e) => setToInput(e.target.value)}
          placeholder="Input"
          className="bg-zinc-500 px-4 py-2 "
        />
      </div>

      <div className="whitespace-pre-wrap bg-black p-2 rounded">{serverResponse || "No response from server yet"}</div>
    </div>
  );
}
