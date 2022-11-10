import React, { useEffect, useState } from "react";
import useTitle from "../../../hooks/useTitle";
import ServiceCard from "./ServiceCard";

const ServicesAll = () => {
  const [services, setServices] = useState([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch("https://server-home-made.vercel.app/allservices")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoader(false);
      });
  }, []);

  useTitle("All services");

  if (loader) {
    return (
      <>
        <div className="bg-gray-100 mt-40">
          <div className="px-4 py-12 bg-white">
            <div className="mx-auto flex justify-center">
              <div className="relative">
                <div className="w-[160px] h-[160px] border border-indigo-400 rounded-full" />
                <div className="w-[140px] h-[140px] border border-indigo-400 rounded-full absolute top-2.5 right-2.5" />
                <div>
                  <svg
                    className="absolute top-[22px] right-[26px] animate-spin"
                    width={113}
                    height={113}
                    viewBox="0 0 113 113"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M56.7631 110.374C46.061 110.374 35.5993 107.2 26.7008 101.255C17.8023 95.3088 10.8668 86.8579 6.77128 76.9704C2.67576 67.083 1.60419 56.2031 3.69207 45.7066C5.77994 35.2102 10.9335 25.5686 18.501 18.001C26.0686 10.4335 35.7102 5.27994 46.2066 3.19207C56.7031 1.10419 67.583 2.17576 77.4704 6.27128C87.3579 10.3668 95.8088 17.3023 101.755 26.2008C107.7 35.0993 110.874 45.561 110.874 56.2631"
                      stroke="#4338CA"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeDasharray="16 16"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600 text-base mt-4">
              Your Request Is Being Loaded, Please Wait
            </p>
          </div>
        </div>
      </>
    );
  }

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
