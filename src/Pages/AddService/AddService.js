import React, { useState } from "react";
import useTitle from "../../hooks/useTitle";

const AddService = () => {
  useTitle("Add Service");

  const [show, setShow] = useState(false);

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
                    Add new item Successfully
                  </h1>
                  <p className="mb-5 text-sm text-gray-600 dark:text-gray-400 text-center font-normal">
                    Thank you for adding new item. It will helps to attract the
                    customer more and more.
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

  const handleAddService = (event) => {
    event.preventDefault();

    const form = event.target;

    const title = form.title.value;
    const image_url = form.image_url.value;
    const price = form.price.value;
    const details = form.details.value;

    const service = {
      category_id: null,
      rating: {
        number: 4.8,
        badge: "Excellent",
      },
      total_view: null,
      price,
      title,
      image_url,
      details,
    };

    fetch("http://localhost:5000/services", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(service),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setShow(true);
          form.reset();
        }
      })
      .catch((error) => console.error("Item post errors: ", error));
  };

  return (
    <form onSubmit={handleAddService} className="text-center mt-8">
      <p className="lg:text-4xl md:text-3xl text-3xl text-center font-semibold text-gray-800">
        Add an item
      </p>
      <p className="text-center mt-4 text-gray-600">
        Want to add a new item? Please fill those requirements.
      </p>
      <div className="mt-8 px-4 flex flex-col justify-center items-center">
        <input
          required
          type="text"
          name="title"
          placeholder="Enter item title"
          className="md:w-[643px] w-full resize-none focus:outline-none border border-gray-300 px-3 py-3 mb-4"
        />
        <input
          required
          type="text"
          name="image_url"
          placeholder="Enter item image url"
          className="md:w-[643px] w-full resize-none focus:outline-none border border-gray-300 px-3 py-3 mb-4"
        />
        <input
          required
          type="number"
          name="price"
          placeholder="Price"
          className="md:w-[643px] w-full resize-none focus:outline-none border border-gray-300 px-3 py-3 mb-4"
        />
        <textarea
          required
          name="details"
          className="md:w-[643px] w-full md:h-[208px] h-[340px] resize-none focus:outline-none border border-gray-300 px-3 py-3"
          placeholder="Item details..."
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

export default AddService;
