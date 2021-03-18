import React from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { ReactComponent as LinkedIn } from "../../resources/images/linkedinIcon.svg";
import { ReactComponent as Github } from "../../resources/images/github.svg";
import { Container, SocialButtons, Button, Text } from "./styles";

const sendEmail = () => {
  window.location = "mailto:nickprender@gmail.com";
};

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
