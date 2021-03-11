import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { Typography } from "@material-ui/core";

import { ReactComponent as Logo } from "../../resources/images/Logo.svg";
import { ReactComponent as LinkedIn } from "../../resources/images/linkedinIcon.svg";
import { ReactComponent as Github } from "../../resources/images/github.svg";

import styled from "styled-components";

const sendEmail = () => {
  window.location = "mailto:nickprender@gmail.com";
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 5rem;
  flex-shrink: 0;
  padding-top: 1rem;
`;

const SocialButtons = styled.div`
  color: white;
  background-color: transparent;
`;

const Button = styled.button`
  color: white;
  fill: white;
  background-color: transparent;
  border: none;
  text-decoration: none;
`;

const Text = styled.div`
  color: white;
  font-size: small;
`;

export default function Footer() {
  return (
    <Container>
      <SocialButtons>
        <Button
          aria-label="linkedIn icon"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/nicholas-prendergast-499785a6/",
              "_blank"
            )
          }
        >
          <LinkedIn />
        </Button>
        <Button
          aria-label="github icons"
          onClick={() =>
            window.open("https://github.com/nickprender12", "_blank")
          }
        >
          <Github />
        </Button>
        <Button aria-label="mail icon" onClick={() => sendEmail()}>
          <MailOutlineIcon />
        </Button>
      </SocialButtons>
      <Text>
        <p>Created by me © 2021</p>
      </Text>
    </Container>
  );
}
