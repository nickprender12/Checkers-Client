import React from "react";
import { SocketContext, socket } from "./context/socket";
import "./App.css";

import { AppWindow, Footer } from "./components";

function App() {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <AppWindow />
        <Footer />
      </SocketContext.Provider>
    </div>
  );
}

export default App;
