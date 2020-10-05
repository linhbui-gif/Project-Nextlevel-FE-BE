import { Carousel, Button } from "react-bootstrap";
import React from "react";
import CoverImage from "../common/CoverImage";

const Slider = (): JSX.Element => (
  <Carousel className="carousel slide">
    <Carousel.Item>
      <CoverImage variant="dark" />
      <Carousel.Caption>
        <h1>Take your React.js skills to the Next Level</h1>
        <p className="text-lead">
          Follow our 30 day React Bootcamp and learn from our best practices.
        </p>
        <Button variant="success">View projects</Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <CoverImage variant="info" />

      <Carousel.Caption>
        <h1>Hands on experience</h1>
        <p className="text-lead">
          Join one of our handpicked projects and build features
        </p>
        <Button variant="secondary">View projects</Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <CoverImage variant="success" />
      <Carousel.Caption>
        <h1>Hands on experience</h1>
        <p className="text-lead">
          Join one of our handpicked projects and build features
        </p>
        <Button variant="secondary">View projects</Button>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);
export default React.memo(Slider);
