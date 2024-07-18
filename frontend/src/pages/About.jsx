import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";

import driveImg from "../assets/all-images/blog-img/about1.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
              <h4 className="section__subtitle">Who</h4>
              <h2 className="section__title" style={{fontWeight:'bold'}}>We Are</h2>

                <p className="section__description">
                MotoHire was founded with a vision to simplify the car rental process and offer a wide range of vehicles that cater to every budget and preference. Our team of dedicated professionals works tirelessly to ensure that every customer has a smooth and enjoyable rental experience. We take pride in our extensive fleet of well-maintained vehicles, exceptional customer service, and competitive pricing.
                </p>

                <h4 className="section__subtitle">Our</h4>
                <h2 className="section__title" style={{fontWeight:'bold'}}>Mission</h2>

                <p className="section__description">
                Our mission is to make car rental easy, accessible, and affordable for everyone. We strive to provide top-quality vehicles and excellent customer service to ensure that every journey with MotoHire is comfortable and hassle-free. We are committed to continuous improvement and innovation, always looking for ways to enhance our services and exceed customer expectations.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>


      <section style={{marginTop:"5rem"}}>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Why</h6>
              <h2 className="section__title">MotoHire?</h2>
            </Col>
            <OurMembers />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default About;
