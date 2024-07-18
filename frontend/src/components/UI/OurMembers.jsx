import React from "react";
import "../../styles/our-member.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import ava01 from "../../assets/all-images/blog-img/about2.jpg";
import ava02 from "../../assets/all-images/blog-img/about5.jpg";
import ava03 from "../../assets/all-images/blog-img/about3.jpg";
import ava04 from "../../assets/all-images/blog-img/about4.jpg";

const OUR__MEMBERS = [
  {
    name: "Wide Range of Vehicles",
    desc: "From compact cars and sedans to SUVs and luxury vehicles, our diverse fleet ensures that you find the perfect car for any occasion.",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava01,
  },

  {
    name: "Affordable Rates",
    desc: "We offer competitive pricing with no hidden fees, making it easy for you to plan your travel budget.",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava02,
  },

  {
    name: "Flexible Rental Options",
    desc: "Whether you need a car for a day, a week, or longer, we provide flexible rental periods to suit your needs.",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava03,
  },

  {
    name: "24/7 Customer Support",
    desc: "Our dedicated customer support team is available around the clock to assist you with any queries or issues.",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava04,
  },
];

const OurMembers = () => {
  return (
    <>
      {OUR__MEMBERS.map((item, index) => (
        <Col lg="3" md="3" sm="4" xs="6" key={index} className="mb-4">
          <div className="single__member">
            <div className="single__member-img">
              <img src={item.imgUrl} alt="" className="w-100" />

              <div className="single__member-social">
                <p style={{color:"#f4f4f4", padding:"0 1em"}}>{item.desc}</p>
              </div>
            </div>

            <h6 className="text-center mb-4 mt-4" style={{fontWeight:'bold'}}>{item.name}</h6>
          </div>
        </Col>
      ))}
    </>
  );
};

export default OurMembers;
