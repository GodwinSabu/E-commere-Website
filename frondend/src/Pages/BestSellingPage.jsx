
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import Header from "./Layout/Header";
import styles from "../Styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Footer from "../components/Layout/Footer";

const BestSellingPage = () => {


  
    const [data, setData] = useState([]);
    console.log('Product Data:', productData);
  
    useEffect(() => {
        const d = productData && productData.sort((a,b)=> b.total_sell - a.total_sell)
        setData(d)
    }, []);
  
    console.log('Data:', data);
  
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return null;
    }

  return (
    <div>
    <Header activeHeading={2} />
    <br />
    <br />
    <div className={`${styles.section}`}>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
        {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
      </div>
  
    </div>
    <Footer />
  </div>
  );
};

export default BestSellingPage;
