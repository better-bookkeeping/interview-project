// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import { Button } from "./Button";
import { ServerInteraction } from "./ServerInteraction";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <main className="bg-zinc-800 text-white h-screen w-screen overflow-auto flex flex-col gap-8 items-center justify-center">
      <div className="flex gap-[80px]">
        <a href="https://vitejs.dev" target="_blank">
          <img className="h-[150px] w-[150px]" src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img className="h-[150px] w-[150px]" src={reactLogo} alt="React logo" />
        </a>
      </div>
      <h1 className="font-bold text-6xl">Vite + React</h1>
      <ServerInteraction />
      {/* <div className="flex flex-col gap-2">
        <Button label={`Count is ${count}`} onClick={() => setCount((count) => count + 1)} />
        <Button label={`This doesn't do anything`} type="success" />
        <Button
          label={`Try me!`}
          type="warning"
          onClick={() => {
            alert("Hello world!");
          }}
        />

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div> */}
    </main>
  );
}

export default App;
