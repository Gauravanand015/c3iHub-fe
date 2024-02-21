// Items.jsx
import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import AddButton from "./AddButton";
import EditItemModal from "./EditItemModal";
import FilterBar from "./FilterBar";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const Items = () => {
  const [loader, setLoader] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [titleOption, setTitleOption] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const { token } = useSelector((state) => ({ token: state.token }));

  useEffect(() => {
    setLoader(true);
    fetch(
      `http://localhost:9090/products?title=${titleOption}&sortValue=${sortOption}&search=${searchOption}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((products) => {
        console.log(products);
        setProductsData(products);
        setLoader(false);
      })
      .catch((error) => console.error(error.message));
  }, [dataUpdated, sortOption, titleOption, searchOption]);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditProductModalOpen(true);
  };

  return (
    <>
      <FilterBar
        setSortOption={setSortOption}
        setTitleOption={setTitleOption}
        setSearchOption={setSearchOption}
      />
      <AddButton
        setAddProductModalOpen={setAddProductModalOpen}
        addProductModalOpen={addProductModalOpen}
        setDataUpdated={setDataUpdated}
        dataUpdated={dataUpdated}
      />
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center w-[70%] m-auto p-5 mt-5 ${
          addProductModalOpen || editProductModalOpen ? "disableBackground" : ""
        }`}
      >
        {loader ? (
          <Loading />
        ) : (
          productsData.map((product) => (
            <ItemList
              key={product._id}
              item={product}
              openEditModal={openEditModal}
              setDataUpdated={setDataUpdated}
              dataUpdated={dataUpdated}
            />
          ))
        )}
      </div>
      {editProductModalOpen && selectedProduct && (
        <EditItemModal
          item={selectedProduct}
          setEditProductModalOpen={setEditProductModalOpen}
          setDataUpdated={setDataUpdated}
          dataUpdated={dataUpdated}
        />
      )}
    </>
  );
};

export default Items;
