import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";



const Footer = () => {
  return (
    <>
    <div className='h-[306px] py-[64px] px-[32px] bg-gray-100 flex justify-center items-center'>
      <div className='flex justify-evenly w-[960px] mx-auto h-[100%]  '>
     <div className='w-[20%] '>
       <h3 className='font-serif font-medium'>Shop</h3>
       <ul className='flex flex-col mt-5 gap-2 text-xs font-sans font-normal'>
        <li>Agriculture</li>
        <li>Home Decor</li>
        <li>Art and Craft</li>
        <li>Fashion</li>  
       </ul>
     </div>
     <div className='w-[20%] '>
     <h3 className='font-serif font-medium'>Coorperate Info</h3>
       <ul className='flex flex-col mt-5 gap-2 text-xs font-sans font-normal'>
        <li>About Rural Connect</li>
        <li>Press</li>
        <li>Join Cummunity</li>
        <li>Sustainibility</li>  
        <li>Join Rural Connect</li>  
       </ul>              
     </div>
     <div className='w-[20%] '>
     <h3 className='font-serif font-medium'>Help</h3>
       <ul className='flex flex-col mt-5 gap-2 text-xs font-sans font-normal'>
        <li>Customer Service</li>
        <li>Legal and Privacy</li>
        <li>Report a scam</li>
        <li>Cookies Notice</li>  
        <li>Contact</li>  
       </ul> 
     </div>
     <div className='w-[40%] '>
    <div className='flex justify-center gap-6 text-2xl mt-8'> 
     <FaInstagram />
     <FaTwitter />
     <FaFacebookSquare />
     <FaYoutube />
     </div> 
     </div>
      </div>
      
    </div>
    <div className='h-24 bg-slate-100 text-center text-xs font-sans font-normal '>
      <p>The content of this site is copyright-protected and is the property of Rural Connect</p>
    </div>
    </>
  )
}

export default Footer