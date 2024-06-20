  import React, { useEffect, useMemo, useState } from "react";
  import { useParams, useSearchParams } from "react-router-dom";
  // import { productData } from "../static/data";
  import Header from "./Layout/Header";
  import styles from "../Styles/styles";
  import ProductCard from "../components/Route/ProductCard/ProductCard";
  import Footer from "../components/Layout/Footer";
  import { useSelector } from "react-redux";

  const ProductsPage = () => {
    const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  console.log('Category:', categoryData);

  const { allProducts } = useSelector((state) => state.products);
  console.log('All Products:', allProducts);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setLoading(true); // Set loading state to true when fetching data
    if (allProducts) {
      if (categoryData === null) {
        const sortedData = [...allProducts].sort((a, b) => a.sold_out - b.sold_out);
        setData(sortedData);
        setLoading(false); // Set loading state to false after data is fetched
      } else {
        const filteredData = allProducts.filter((product) => product.category === categoryData);
        setData(filteredData);
        setLoading(false); // Set loading state to false after data is fetched
      }
    }
  }, [categoryData, allProducts]);
  // useEffect(() => {
  //   if (categoryData && categoryData.length > 0) {
  //     if (categoryData === null) {
  //       setData(allProducts); // Set all products directly when no category is selected
  //     } else {
  //       const filteredData = allProducts.filter((product) => product.category === categoryData);
  //       setData(filteredData);
  //       console.log('Filtered Data:', filteredData);
  //     }
  //   }
  // }, [allProducts, categoryData]);
  

      // const filteredData = useMemo(() => {
      //   if (!categoryData || !allProducts) {
      //     return allProducts; // Return allProducts directly if it's falsy or undefined
      //   } else {
      //     return allProducts.filter((product) => product.category === categoryData);
      //   }
      // }, [categoryData, allProducts]);
    
      // console.log('Data:', data);
    
      // if (!Array.isArray(data)) {
      //   console.error('Data is not an array:', data);
      //   return null;
      // }

    return (
      <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
    );
  };

  export default ProductsPage;
