import React, { useEffect } from 'react'
import ShopLogin from "../components/Shop/ShopLogin"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ShopLoginPage = () => {
  const navigate = useNavigate()
  const {isSeller ,seller, isLoading} = useSelector((state)=> state.seller)
console.log(isSeller,'kkkkkkkkklll---');

  useEffect(() => {
    if(isSeller === true) {
      navigate(`/dashboard`)
    }
  },  [isSeller, isLoading])
  return (  
    <div>
       <ShopLogin />  
    </div>
  )
}

export default ShopLoginPage