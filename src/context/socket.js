import React from "react";
import io from "socket.io-client";
// import { SOCKET_URL } from "config";

export const socket = io.connect("http://localhost:5000");
// export const socket = io.connect("https://evening-tundra-99017.herokuapp.com/");
//export const socket = io.connect("/");
export const SocketContext = React.createContext();
