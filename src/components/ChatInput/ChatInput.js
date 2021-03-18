import React, { useState, useContext } from "react";
import { SocketContext } from "../../context/socket";
import ChatStatus from "../ChatStatus";
import { MessageBar, TextField, Form, Input, Btn } from "./styles";

export default function ChatInput(props) {
  const { user, userList } = props;

  const socket = useContext(SocketContext);

  const [message, setMessage] = useState("");

  const sendMessage = (msg) => {
    socket.emit("chat message", { user, msg });
  };

  const sendIsTyping = () => {
    socket.emit("user is typing");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (userList.length > 1) {
      sendIsTyping();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <MessageBar>
      <ChatStatus userList={userList} currentUser={user} />
      <TextField>
        <Form action="" onSubmit={handleSubmit}>
          <Input
            type="text"
            value={message}
            placeholder={"message"}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            repeat="true"
          />
          <Btn>{">"}</Btn>
        </Form>
      </TextField>
    </MessageBar>
  );
}
