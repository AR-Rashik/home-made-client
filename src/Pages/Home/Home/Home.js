import React from "react";
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import Testimonials from "../Testimonials/Testimonials";
import "react-photo-view/dist/react-photo-view.css";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <AboutUs></AboutUs>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
