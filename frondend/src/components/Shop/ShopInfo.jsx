import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../Styles/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAllProductsShop } from "../../redux/actions/product";
// import { error } from "console";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();
  console.log(seller, "hkolkdjfdddddddddddddddd-------------", );
  // const dispatch = useDispatch(); 
  // useEffect(() => {
  //   console.log("Fetching products for shop with ID:", id);
  //   dispatch(getAllProductsShop(id));
  // }, [dispatch]);


  // const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    axios.get(
      `${server}/shop/get-shop-info/${id}`)
        .then((res) => {
          console.log(res,'pppp1111111');
          setData(res.data.shop);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        })
  }, []);

  // const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    console.log("Logging out...");

    try {
      await axios.get(`${server}/shop/logout`, { withCredentials: true });
      console.log("Logout successful");
      navigate("/shop/login");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="w-full py-5">
      <div className="w-full flex item-center justify-center">
        <img
          src={`${backend_url}${data.avatar}`}
          alt=""
          className="w-[150px] h-[150px] object-cover rounded-full bg-blue-100 "
        />{" "}
        <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {data.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{data.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">10</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000b0]">2/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000b0]">{seller?.createdAt?.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <Link to="/settings">
            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            >
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div
            className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};
// coommon thath
export default ShopInfo;
