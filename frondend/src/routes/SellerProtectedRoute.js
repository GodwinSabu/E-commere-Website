// import { isAuthenticated } from "../../backend/middileware/auth"

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import Loader from "../components/Layout/Loader";


const SellerProctectedRoute =({ children})=>{
    const {isSeller, isLoading} = useSelector((state)=>state.seller)

    console.log(isSeller,'dddddd isellerr proxcted route ');
    if(isLoading === true){
       return <Loader />
        }else{
            if(!isSeller){
                return <Navigate to={`/shop-login`} replace />
        }
        return children
    }


   
}

export default SellerProctectedRoute