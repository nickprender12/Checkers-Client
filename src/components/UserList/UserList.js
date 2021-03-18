import React from "react";
import { List, Title} from './styles'

export default function UserList({ userList }) {
  // let users = userList.map(({ name }, idx) => (
  //   <User key={idx} >
  //     <span style={{ color: "green" }}>{name}</span>
  //   </User>
  // ));

  return (
    <List>
      <Title>users</Title>
      {/* <Users>{users}</Users> */}
    </List>
  );
}
