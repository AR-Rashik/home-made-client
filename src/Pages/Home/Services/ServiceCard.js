import React from "react";
import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ServiceCard = ({ service }) => {
  const { image_url, title, price, details, _id, rating } = service;

  return (
    <div className="mx-2 w-72 lg:mb-0 mb-8 hover:shadow-indigo-200 hover:shadow-2xl transition duration-150 ease-in-out">
      <div>
        <PhotoProvider>
          <PhotoView src={image_url}>
            <img src={image_url} alt="" className="w-full h-44" />
          </PhotoView>
        </PhotoProvider>
      </div>
      <div className="bg-white">
        <div className="flex items-center justify-between px-4 pt-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-bookmark"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
            </svg>
          </div>
          <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
            <p className="text-xs text-yellow-700 font-bold">{rating.number}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            {/* <p className="text-xs text-gray-600 pl-5">4 days ago</p> */}
          </div>
          <p className="text-md text-gray-600 mt-2">
            {details.length > 100 ? details.slice(0, 100) + "..." : details}
          </p>
          {/* <div className="flex mt-4">
            <div>
              <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                12 months warranty
              </p>
            </div>
            <div className="pl-2">
              <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                Complete box
              </p>
            </div>
          </div> */}
          <div className="flex items-center justify-between py-4">
            <Link
              to={`/services/${_id}`}
              className="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 font-medium text-sm"
            >
              Details
            </Link>
            <h3 className="text-indigo-700 text-xl font-semibold">${price}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
