import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

import "./App.css";
import { ChartComponent1 } from './ui/Chart'






// 键盘事件
// import { listen } from "@tauri-apps/api/event";

// 监听 'shortcut-event' 事件
// listen("shortcut-event", async (event) => {
//   const existedWindow = await WebviewWindow.getByLabel("search");
//   if (existedWindow) {
//     const isVisible = await existedWindow.isVisible();
//     if (isVisible) {
//       await existedWindow.hide();
//     } else {
//       await existedWindow.show();
//     }
//     return;
//   }
//   const webview = new WebviewWindow("search", {
//     center: true,
//     width: 800,
//     height: 100,
//     alwaysOnTop: true,
//     skipTaskbar: false,
//     decorations: false,
//     closable: false,
//     url: "http://localhost:1420/Search",
//   });
//   webview.once("tauri://created", function () {
//     console.log("webview created");
//   });
//   webview.once("tauri://error", function (e) {
//     console.log("error creating webview", e);
//   });
// });

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  const openWindows = async () => {
    const webview = new WebviewWindow("theUniq12837921ueLabel", {
      url: "https://github.com/tauri-apps/tauri",
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    });

    webview.once("tauri://created", () => {
      console.log("webview created!");
    });

    webview.once("tauri://error", e => {
      console.error("error creating webview", e);
    });
  };

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>
      <ChartComponent1 />

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      {/* <button onClick={() => open("google.com")}>Open</button> */}
      <button onClick={() => openWindows()}>Open</button>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
