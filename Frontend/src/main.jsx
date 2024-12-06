import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { SocketContextProvider } from "./context/SocketContext.jsx";
import { store, persistor } from "./redux/store.js";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketContextProvider>
        <App />
        <Toaster />
      </SocketContextProvider>
    </PersistGate>
  </Provider>
);
