import React from "react";
import { SocketContext, socket } from "./context/socket";
import styled from "styled-components";
import bg from './resources/images/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2020-4096x2304-1455-small.jpg';

import { AppWindow, Footer } from "./components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-image: url(${bg});
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function App() {
  return (
    <Wrapper>
      <SocketContext.Provider value={socket}>
        <AppWindow />
        <Footer />
      </SocketContext.Provider>
    </Wrapper>
  );
}

export default App;
