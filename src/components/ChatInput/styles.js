import styled from "styled-components";

export const MessageBar = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-content: center;
  /* height: 10%; */
`;

export const TextField = styled.div`
  /* padding-top: 5%; */
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  @media screen and (max-width: 500px) {
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(255 255 255 / 35%);
  border-radius: 20px;
`;

export const Input = styled.input`
  margin: 0.5rem;
  flex-grow: 2;
  border: none;
  background-color: transparent;
  color: #fff;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: white;
    font-size: 1em;
  }
`;

export const Btn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: large;
  color: #fff;
`;
