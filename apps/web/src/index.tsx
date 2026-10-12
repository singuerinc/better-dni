import "./main.css";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("app");

if (!container) {
  throw new Error("Missing #app element");
}

createRoot(container).render(<App />);
