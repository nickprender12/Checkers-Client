import React from "react";
import styled from "styled-components";

const List = styled.div`
  display: flex;
  flex-direction: "column";
  width: 98px;
  height: 500px;
  text-align: "left" ;
`;

const Title = styled.div`
  margin: "5px" ;
  font-weight: "bold" ;
`;

const Users = styled.div`
  margin: "5px";
`;

const User = styled.div``;

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
