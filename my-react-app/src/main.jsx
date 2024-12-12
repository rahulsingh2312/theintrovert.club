import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Send, Twitter, Instagram } from "lucide-react";

createRoot(document.getElementById("root")).render(
  <div className="overflow-hidden">
    <StrictMode>
      <App />
    </StrictMode>
  </div>
),
  document.getElementById("root");
