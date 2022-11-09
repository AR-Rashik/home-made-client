import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import ServiceReview from "../../MyReviews/ServiceReview";

const DetailsService = () => {
  const service = useLoaderData();
  const { image_url, title, price, details, _id, rating } = service;
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/servicereviews?service=${_id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [_id]);

  const handleReview = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const email = user?.email || "unregistered";
    const image = user?.photoURL;
    const message = form.message.value;

    const date = Date;

    const review = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      image,
      message,
    };

    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Review placed successfully");
          form.reset();
        }
      })
      .catch((error) => console.error("Review post errors: ", error));
  };

  return (
    <div className="xl:mx-auto xl:container">
      {/* Service details section */}
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
      {/* Service reviews section */}
      <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full space-y-8">
          <div className="flex justify-center items-center">
            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Reviews
            </p>
          </div>
          {/* Single reviews */}
          {reviews.map((review) => (
            <ServiceReview key={review._id} review={review}></ServiceReview>
          ))}
        </div>
      </div>
      {/*Client Review section */}
      <form onSubmit={handleReview} className="text-center">
        <p className="lg:text-4xl md:text-3xl text-3xl text-center font-semibold text-gray-800">
          Give us your review
        </p>
        <p className="text-center mt-4 text-gray-600">
          Do you have any thoughts you’d like to share?
        </p>
        <div className="mt-8 px-4 flex flex-col justify-center items-center">
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="md:w-[643px] w-full resize-none focus:outline-none border border-gray-300 px-3 py-3 mb-4"
          />
          <textarea
            name="message"
            className="md:w-[643px] w-full md:h-[208px] h-[340px] resize-none focus:outline-none border border-gray-300 px-3 py-3"
            placeholder="Your review..."
            defaultValue={""}
          />
        </div>
        <div className="lg:flex justify-center gap-8 text-center lg:mt-6 md:mt-8 mt-8">
          <input
            type="submit"
            value="Submit"
            className="bg-gray-800 hover:bg-gray-700 transition duration-300 ease-out lg:max-w-[187px] w-full text-white py-3 font-medium text-base"
          />
        </div>
      </form>
    </div>
  );
};

export default DetailsService;
