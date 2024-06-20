import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../Styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const {wishlist} = useSelector((state)=>state.wishlist)
  const { cart } = useSelector((state) => state.cart);

  

  useEffect(()=>{
    if(wishlist && wishlist.find((i)=> i._id === data._id)){
      setClick(true)
    }else{
      setClick(false)
    }
  },[wishlist])

  const removeFromWishlistHandler= (data)=>{
    setClick(!click)
    dispatch(removeFromWishlist(data))
  }
  const addToWishlistHandler=(data)=>{
    setClick(!click)
    dispatch(addToWishlist(data))
  }
  const addToCartHandler = (id) => {
    const isItemExits = cart && cart.find((i) => i._id === id);
    if (isItemExits) {
      toast.error("Item already exists");
    } else {
      if(data.stock < 1){
        toast.error("Product stock limited ")
      }else{
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("item added to cart succesfully ");
      }
     
    }
  };
  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-md p-5 relative cursor-pointer">
      <div className="flex justify-end"></div>
      <Link to={`/product/${data._id}`}>
        <img
          src={`${backend_url}${data?.images && data?.images[0]}`}
          alt=""
          className="w-full h-[170px] object-contain"
        />
      </Link>
      <Link to={`/shop/preview/${data?.shop._id}`}>
        <h5 className={`${styles.shop_name}`}>{data?.shop?.name}</h5>
      </Link>
      <Link to={`/product/${data._id}`}>
        <h4 className="pb-3 font-[500]">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
        <div className="flex">
          <AiFillStar
            className="mr-2 cursor-pointer "
            size={20}
            color="#F6BA00"
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
          <AiOutlineStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
        </div>
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data?.discountPrice === 0
                ? data?.discountPrice
                : data?.originalPrice}
            </h5>
            <h4 className={`${styles.price}`}>
              {data?.originalPrice ? data?.originalPrice + " $" : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284] ">
            {data?.total_sell} sold
          </span>
        </div>
      </Link>
      {/* side options  */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => removeFromWishlistHandler(data)}
            color={click ? "red" : "#333"}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => addToWishlistHandler(data)}
            color={click ? "red" : "#333"}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Quick view"
        />
        <AiOutlineShoppingCart
          size={22}
          className="cursor-pointer absolute right-2 top-24"
          onClick={() => addToCartHandler(data._id)}
          color="#444"
          title="Add to cart"
        />
        {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
      </div>
    </div>
  );
};

export default ProductCard;






// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "../../../Styles/styles";
// import {
//   AiFillHeart,
//   AiOutlineHeart,
//   AiOutlineEye,
//   AiOutlineShoppingCart,
//   AiFillStar,
//   AiOutlineStar,
// } from "react-icons/ai";
// import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
// import { backend_url } from "../../../server";

// const ProductCard = ({ data }) => {
//   const [click, setClick] = useState(false);
//   const [open, setOpen] = useState(false);

//   const handleHeartClick = () => {
//     setClick(!click);
//   };

//   const handleOpenClick = () => {
//     setOpen(!open);
//   };

//   const generateProductPath = (productName) => {
//     return productName.replace(/\s+/g, "-");
//   };

//   return (
//     <div className="w-full h-[370px] bg-white rounded-lg shadow-md p-5 relative cursor-pointer">
//       <div className="flex justify-end"></div>
//       <Link to={`/product/${generateProductPath(data.name)}`}>
//         <img
//           src={`${backend_url}${data?.images && data?.images[0]}`}
//           alt=""
//           className="w-full h-[170px] object-contain"
//         />
//       </Link>
//       <Link to="/">
//         <h5 className={`${styles.shop_name}`}>{data?.shop?.name}</h5>
//       </Link>
//       <Link to={`/product/${generateProductPath(data.name)}`}>
//         <h4 className="pb-3 font-[500]">
//           {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
//         </h4>
//         <div className="flex">
//           <AiFillStar size={20} color="#F6BA00" />
//           <AiFillStar size={20} color="#F6BA00" />
//           <AiFillStar size={20} color="#F6BA00" />
//           <AiFillStar size={20} color="#F6BA00" />
//           <AiOutlineStar size={20} color="#F6BA00" />
//         </div>
//         <div className="py-2 flex items-center justify-between">
//           <div className="flex">
//             <h5 className={`${styles.productDiscountPrice}`}>
//               {data?.discountPrice === 0 ? data?.discountPrice : data?.originalPrice}
//             </h5>
//             <h4 className={`${styles.price}`}>
//               {data?.originalPrice ? data?.originalPrice + " $" : null}
//             </h4>
//           </div>
//           <span className="font-[400] text-[17px] text-[#68d284] ">
//             {data?.total_sell} sold
//           </span>
//         </div>
//       </Link>
//       {/* Side options  */}
//       <div>
//         {click ? (
//           <AiFillHeart
//             size={22}
//             className="cursor-pointer absolute right-2 top-5"
//             onClick={handleHeartClick}
//             color="red"
//             title="Remove from wishlist"
//           />
//         ) : (
//           <AiOutlineHeart
//             size={22}
//             className="cursor-pointer absolute right-2 top-5"
//             onClick={handleHeartClick}
//             color="#333"
//             title="Add to wishlist"
//           />
//         )}
//         <AiOutlineEye
//           size={22}
//           className="cursor-pointer absolute right-2 top-14"
//           onClick={handleOpenClick}
//           color="#333"
//           title="Quick view"
//         />
//         <AiOutlineShoppingCart
//           size={22}
//           className="cursor-pointer absolute right-2 top-24"
//           onClick={handleOpenClick}
//           color="#444"
//           title="Add to cart"
//         />
//         {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
