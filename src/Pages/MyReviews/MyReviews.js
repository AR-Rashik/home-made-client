import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useTitle from "../../hooks/useTitle";
import MySingleReview from "./MySingleReview";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);

  useTitle("My Reviews");

  useEffect(() => {
    fetch(
      `https://server-home-made.vercel.app/myreviews?email=${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [user?.email]);

  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (proceed) {
      fetch(`https://server-home-made.vercel.app/reviews/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            setShow(true);
            const remaining = reviews.filter((revw) => revw._id !== id);
            setReviews(remaining);
          }
        });
    }
  };

  // Modal
  if (show) {
    return (
      <div>
        <div>
          {show && (
            <div
              className="py-12 bg-gray-700 dark:bg-gray-900 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
              id="modal"
            >
              <div
                role="alert"
                className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
              >
                <div className="relative py-8 px-8 md:px-16 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                  <div className="w-full flex justify-center text-green-400 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-circle-check"
                      width={56}
                      height={56}
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx={12} cy={12} r={9} />
                      <path d="M9 12l2 2l4 -4" />
                    </svg>
                  </div>
                  <h1 className="text-center text-gray-800 dark:text-gray-100 font-lg font-bold tracking-normal leading-tight mb-4">
                    Review Deleted Successfully
                  </h1>
                  <p className="mb-5 text-sm text-gray-600 dark:text-gray-400 text-center font-normal">
                    You can add more review on different
                  </p>
                  <div className="flex items-center justify-center w-full">
                    <button
                      onClick={() => setShow(!show)}
                      className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
                    >
                      Close
                    </button>
                  </div>
                  <div
                    className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out"
                    onClick={() => setShow(!show)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Close"
                      className="icon icon-tabler icon-tabler-x"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="w-full flex justify-center py-12" id="button">
            <button
              className="focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
              onClick={() => setShow(!show)}
            >
              Open Modal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {reviews.length !== 0 ? (
        <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full space-y-8">
            <div className="flex justify-center items-center">
              <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Reviews
              </p>
            </div>
            {/* Single reviews */}
            {reviews.map((review) => (
              <MySingleReview
                key={review._id}
                review={review}
                handleDelete={handleDelete}
              ></MySingleReview>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center font-bold text-6xl my-40">
          No reviews were added.
        </div>
      )}
    </>
  );
};

export default MyReviews;
