import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/Produts/ProductDetails";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import SuggestedProduct from "../components/Produts/SuggestedProduct";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { id } = useParams();
  // console.log(useParams());
  // console.log(name, "eeeee");
  const [data, setData] = useState(null);
  // const productId = name.replace(/-/g, "");

  const {allProducts} = useSelector((state) => state.products)

  useEffect(() => {
    // const normalizedProductId = productId.replace(/-/g, "").toLowerCase();
    // const product = allProducts.find(
    //   (i) => i.name.replace(/ /g, "").toLowerCase() === normalizedProductId
    // );
    const data = allProducts && allProducts.find((i)=> i._id === id)

    // console.log("Found Product:", product);
    setData(data);
  }, [data , allProducts]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
