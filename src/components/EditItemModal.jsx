import React, { useRef } from "react";
import { useSelector } from "react-redux";

const EditItemModal = ({
  item,
  setEditProductModalOpen,
  setDataUpdated,
  dataUpdated,
}) => {
  const titleRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const { token } = useSelector((state) => ({ token: state.token }));
  const formHandler = (event) => {
    event.preventDefault();
    saveItemHandler();
  };

  const cancelHandler = () => {
    setEditProductModalOpen(false);
  };

  const saveItemHandler = async () => {
    const res = await fetch(`http://localhost:9090/product/${item._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: titleRef.current.value,
        price: priceRef.current.value,
        quantity: quantityRef.current.value,
      }),
    });

    const result = await res.json();
    console.log(result);
    switch (res.status) {
      case 200:
        alert(result.message);
        setEditProductModalOpen(false);
        setDataUpdated(!dataUpdated);
        break;
      case 500:
        alert(result.message);
        break;
    }
  };

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-md w-[30%] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Item</h2>
      <form className="space-y-4" onSubmit={formHandler}>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title Name"
            defaultValue={item.title}
            ref={titleRef}
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
            defaultValue={item.price}
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
            defaultValue={item.quantity}
            ref={quantityRef}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={cancelHandler}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md focus:outline-none hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItemModal;
