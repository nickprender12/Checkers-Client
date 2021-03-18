import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 20px;
  background-color: rgba(36, 39, 59, 0.3);
  height: 15rem;
  width: 15rem;
  margin: 1rem;
`;
export const Header = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  /* font-size: large; */
  color: #fff;
  border: 1px solid rgba(255 255 255 / 35%);
  border-radius: 20px;
  padding-top: 0.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 0.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255 255 255 / 35%);
  border-radius: 20px;
  margin: 1rem;
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