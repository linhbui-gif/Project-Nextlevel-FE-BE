import React from "react";
import { Carousel, Button } from "react-bootstrap";
import { FaDiscord } from "react-icons/fa";
import CoverImage from "../common/CoverImage";
import CONSTANTS from "../../constants";

const openDiscord = () => {
  window.open(CONSTANTS.DISCORD_INVITE, "discord", "width:600,height=400");
};

const Slider = (): JSX.Element => (
  <Carousel className="carousel slide" wrap={false}>
    <Carousel.Item>
      <CoverImage url="/white-table.jpg" />
      <Carousel.Caption>
        <h1>Become a better javascript developer</h1>
        <p className="lead">
          Learn from local and international members and develop a professional
          mindset. We offer help improving your react.js and English
          communication skills online.
        </p>
        <Button variant="primary">View projects</Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <CoverImage variant="secondary" />
      <Carousel.Caption>
        <h1>Community projects</h1>
        <p className="lead">
          Join one of our community projects. We work together in an organised
          way to improve your coding skills and create some cool projects that
          might see the eyes of thousands of people.
        </p>
        <Button variant="success">View projects</Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <CoverImage variant="dark" />
      <Carousel.Caption>
        <h1>Online React.js community</h1>
        <p className="lead">
          Join our discord server for React.js related discussions. Ask
          questions, discuss new features, practice english and so much more.
        </p>
        <Button variant="primary" onClick={openDiscord}>
          <span className="mx-2">Join</span>
          <FaDiscord size={24} />
        </Button>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);
export default React.memo(Slider);
