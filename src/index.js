import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/app-context";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
