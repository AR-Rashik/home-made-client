import React from "react";
import { useLoaderData } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const UpdateReview = () => {
  const storedReview = useLoaderData();

  useTitle("Edit Review");

  const handleUpdateReview = (event) => {
    event.preventDefault();

    const form = event.target;
    const message = form.message.value;

    const review = {
      message,
    };

    fetch(
      `https://server-home-made.vercel.app/myreviews/update/${storedReview._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(review),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Review edited successfully");
          form.reset();
        }
        console.log(data);
      });
  };

  return (
    <form onSubmit={handleUpdateReview} className="text-center mt-8">
      <p className="lg:text-4xl md:text-3xl text-3xl text-center font-semibold text-gray-800">
        Edit your review
      </p>
      <p className="text-center mt-4 text-gray-600">
        Update your review for{" "}
        <span className="font-semibold text-gray-900">
          {storedReview.serviceName}
        </span>{" "}
        item.
      </p>
      <div className="mt-8 px-4 flex flex-col justify-center items-center">
        {/* <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          className="md:w-[643px] w-full resize-none focus:outline-none border border-gray-300 px-3 py-3 mb-4"
        /> */}
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
  );
};

export default UpdateReview;
