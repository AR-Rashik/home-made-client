import React from "react";
import { useLoaderData } from "react-router-dom";

const DetailsService = () => {
  const service = useLoaderData();
  const { image_url, title, price, details, _id, rating } = service;

  return (
    <div className="xl:mx-auto xl:container">
      <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          <div className="w-full lg:w-1/2 md:py-9 py-6">
            <img
              src={image_url}
              alt="bag"
              className="lg:w-full h-full object-cover object-center w-full"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-12 lg:pr-24">
            <p className="text-sm leading-none text-gray-600 pb-2">Featured</p>
            <p className="md:text-3xl lg:text-4xl text-3xl font-semibold lg:leading-9 text-gray-800 lg:pb-6 md:pb-4 pb-2">
              {title}
            </p>
            <p className="text-md leading-5 text-gray-600 md:pb-10 pb-8">
              {details}
            </p>
            <p className="text-3xl font-medium text-gray-600 mb-8 md:mb-10">
              ${price}
            </p>
            <div className="md:block flex items-center justify-center">
              <button className="lg:w-auto w-full border-2 border-gray-800 hover:text-gray-50 hover:bg-gray-800 focus:outline-none lg:px-10 px-7 lg:py-4 py-3 text-md leading-none text-gray-800">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsService;
