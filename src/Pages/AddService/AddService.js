import React from "react";
import useTitle from "../../hooks/useTitle";

const AddService = () => {
  useTitle("Add Service");

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
          alert("Item placed successfully");
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
