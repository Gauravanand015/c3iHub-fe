// AddButton.jsx
import React from "react";
import AddItemModal from "./AddModal";

const AddButton = ({
  setAddProductModalOpen,
  addProductModalOpen,
  setDataUpdated,
  dataUpdated,
}) => {
  const clickHandler = () => {
    setAddProductModalOpen(!addProductModalOpen);
  };

  return (
    <>
      <div className="flex justify-center items-center text-center mt-5">
        <button
          className="px-4 py-2 bg-green-500 rounded-md text-white font-semibold hover:bg-green-600 transition duration-300"
          onClick={clickHandler}
        >
          Add Product
        </button>
      </div>
      {addProductModalOpen && (
        <AddItemModal
          setAddProductModalOpen={setAddProductModalOpen}
          setDataUpdated={setDataUpdated}
          dataUpdated={dataUpdated}
        />
      )}
    </>
  );
};

export default AddButton;
