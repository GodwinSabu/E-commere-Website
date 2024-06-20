import axios from "axios";
import { server } from "../../server";

export const createProduct = (newform) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest", // Updated to match the reducer
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newform,
      config
    );

    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });
    // console.log(id,'thisis your all prodotv shop id************************************************************ ');
    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
    // console.log(data.products,'4444444444444444444444444444444444444444444444444');
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFail",
      payload: error.response.data.message,
    });
  }
};    

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });
    // console.log('zzzzzzzzz111');

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
    // console.log('zzzzzzzzz12221',data, 'bbbbbbbbbbbb,',data.products);

  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};

//delete product by shop
export const deleteProduct = (id)=> async(dispatch)=>{
    try {
        dispatch({
            type:"deleteProductRequest"
        })
        const {data}= await axios.delete(`${server}/product/delete-shop-product/${id}`,{
            withCredentials:true
        })
        dispatch({
            type:"deleteProductSuccess",
            payload: data.message,
        })

        
    } catch (error) {
        dispatch({
            type: "deleteProductFailed",
            payload: error.response.data.message,
          });
    }
}
