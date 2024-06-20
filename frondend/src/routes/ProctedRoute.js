// import { isAuthenticated } from "../../backend/middileware/auth"

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"


const ProctectedRoute =({ children})=>{
    const {loading, isAuthenticated} = useSelector((state)=> state.user)
    console.log(isAuthenticated,'dddddd ');

    if(loading === false){
        if(!isAuthenticated){
            return <Navigate to="/login" replace />
        }
        return children
    }

}

export default ProctectedRoute