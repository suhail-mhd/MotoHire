import React from "react";

import Slider from "react-slick";
import { Col, Container } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/hero-slider.css";
import "./HeroSlider.css";
import hero from "../../assets/all-images/hero-car.png";
import { Row } from "react-bootstrap";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    // <Slider {...settings} className="hero__slider">
    //   {/* <div className="slider__item slider__item-01 mt0">
    //     <Container>
    //       <div className="slider__content ">
    //         <h4 className="text-light mb-3">For Rent $70 Per Day</h4>
    //         <h1 className="text-light mb-4">Reserve Now and Get 50% Off</h1>

    //         <button className="btn reserve__btn mt-4">
    //           <Link to="/cars">Reserve Now</Link>
    //         </button>
    //       </div>
    //     </Container>
    //   </div>

    //   <div className="slider__item slider__item-02 mt0">
    //     <Container>
    //       <div className="slider__content ">
    //         <h4 className="text-light mb-3">For Rent $70 Per Day</h4>
    //         <h1 className="text-light mb-4">Reserve Now and Get 50% Off</h1>

    //         <button className="btn reserve__btn mt-4">
    //           <Link to="/cars">Reserve Now</Link>
    //         </button>
    //       </div>
    //     </Container>
    //   </div> */}

    // </Slider>
    <div className="m-0 gradient_background" style={{ height: "100vh" }}>
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12">
            <div className="slider__content ">
              <h2 className="text-white pb-3">Drive Your Adventure:</h2>
              <h1 className="text-white pb-4">
                Hassle-Free <span className="outline-text">Car Rentals</span> <br /> Await!
              </h1>
              {/* 
            <button className="btn reserve__btn mt-4">
              <Link to="/cars">Reserve Now</Link>
            </button> */}
              <button className="header__btn btn ">
                <Link to="/cars">Reserve Now</Link>
              </button>
            </div>
          </Col>
          <Col lg="6" md="6" sm="12">
            <div className="hero-img-style">
              <div className="hero-img">
              <img src={hero} alt="hero-img"/>

              </div>
              <div className="glow-circle"></div>
              <div className="bg-logo">
                <p>MOTOHIRE</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSlider;
