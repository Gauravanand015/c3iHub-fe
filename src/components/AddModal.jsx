import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { uploadToCloudinary } from "../utils/fileUpload";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
const AddItemModal = ({
  setAddProductModalOpen,
  setDataUpdated,
  dataUpdated,
}) => {
  const titleRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const [productAdded, setProductAdded] = useState(false);
  const { token } = useSelector((state) => ({ token: state.token }));

  async function fetchData(info) {
    setProductAdded(true);
    const formData = new FormData();

    // Append text data
    formData.append("title", info.title);
    formData.append("price", info.price);
    formData.append("quantity", info.quantity);

    // Append file data
    const imageInput = document.getElementById("imageUrl");
    let secureURL = await uploadToCloudinary(imageInput.files[0]);
    formData.append("image", secureURL.url);
    try {
      let res = await fetch("http://localhost:9090/product", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      let data = await res.json();
      switch (res.status) {
        case 201:
          alert(data.message);
          setAddProductModalOpen(false), setDataUpdated(!dataUpdated);
          setProductAdded(false);
          break;
        case 404:
          alert(data.message);
          break;
        default:
          alert("An unexpected error occurred. Please try again later");
          break;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const formHandler = async (event) => {
    event.preventDefault();
    inputHandler();
  };

  const cancelHandler = () => {
    setAddProductModalOpen(false);
  };

  const inputHandler = () => {
    const title = titleRef.current.value;
    const price = priceRef.current.value;
    const quantity = quantityRef.current.value;
    fetchData({
      title: title,
      price: price,
      quantity: quantity,
    });
  };

  return (
    <div className="block">
      <div className="bg-white p-6 rounded-xl shadow-md w-[30%] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add New Item
        </h2>
        <form className="space-y-4" onSubmit={formHandler}>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter Title Name"
              ref={titleRef}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="imageUrl" className="text-sm font-medium mb-1">
              Image URL
            </label>
            <input
              type="file"
              id="imageUrl"
              name="file"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter Price"
              ref={priceRef}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="quantity" className="text-sm font-medium mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              placeholder="Enter Quantity"
              ref={quantityRef}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center mt-4">
            {productAdded ? (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </Button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Add
              </button>
            )}
            {!productAdded && (
              <button
                type="button"
                onClick={cancelHandler}
                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
