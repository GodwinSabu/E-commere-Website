import React, { useEffect } from 'react'
import ShopCreate from "../components/Shop/ShopCreate"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ShopCreatePage = () => {
  
    const navigate = useNavigate()
    const {isSeller ,seller} = useSelector((state)=> state.seller)
  console.log(isSeller,'kkkkkkkkklll---');
  
    useEffect(() => {
      if(isSeller === true) {
        navigate(`/shop/${seller._id}`)
      }
    },  [isSeller])
  return (
    <div>
        <ShopCreate />
    </div>
  )
}

export default ShopCreatePage