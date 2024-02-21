import React from "react";
import { useSelector } from "react-redux";

const ItemList = ({ item, openEditModal, dataUpdated, setDataUpdated }) => {
  const { token } = useSelector((state) => ({ token: state.token }));

  const deleteItemHandler = async () => {
    const res = await fetch(`http://localhost:9090/product/${item._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (res.status === 200) {
      alert(result.message);
      setDataUpdated(!dataUpdated);
    } else {
      console.log(res);
    }
  };

  return (
    <>
      <div className="border-2 border-slate-600 p-3 text-center rounded-md shadow-md mx-auto mb-4">
        <img
          src={item.img}
          alt={item.title}
          className="w-[300px] h-[300px] rounded-md shadow-md mx-auto mb-4"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            <strong className="font-semibold">Title : </strong>
            {item.title.substring(0, 20) + "..."}
          </h3>
          <p className="text-gray-600 mb-2">
            <strong>Price : </strong>&#8377;{item.price}
          </p>
          <div className="flex justify-center items-center">
            <p
              className={`text-gray-600 mb-2 ${
                item.quantity < 10
                  ? "text-red-500 px-4 py-2 rounded-full bg-red-100"
                  : ""
              }`}
            >
              <strong>Quantity: </strong>
              {item.quantity}
              {item.quantity < 10 && (
                <span className="ml-2 text-xs font-semibold">Low</span>
              )}
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => openEditModal(item)}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600 transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={deleteItemHandler}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemList;
