import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const ServicesAll = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allservices")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="2xl:mx-auto 2xl:container">
      <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8 ">
        <h1 className="lg:text-4xl text-3xl font-semibold text-gray-800 text-center">
          Select Our Food Items
        </h1>
        <h3 className="text-xl text-center">Total item: {services.length}</h3>
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 lg:mt-16 md:mt-12 mt-8 items-center">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service}></ServiceCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesAll;
