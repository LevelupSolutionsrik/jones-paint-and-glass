import React from "react";
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import Image from 'next/image'


export default function Footer() {
  return (
    <section className="footer bg-center bg-no-repeat bg-cover"
     style={{ backgroundImage: "url('/assets/images/footer.png')" }}
     >
       <div className="md:hidden container mx-auto px-4 flex flex-col items-center pt-5">
        <img src="/assets/images/logo.png" alt="" />
      </div>
      <div className="f-contant container mx-auto flex flex-wrap flex-col md:flex-row justify-between py-12 px-4">
        <div className="f-menu flex flex-wrap justify-between text-white text-center md:text-start space-x-16 space-y-10">
          <div className="home">
            <h3 className="font-bold tracking-widest mb-8">HOME</h3>
            <ul className="space-y-2 text-[12px]">
              <li>Locations</li>
              <li>About</li>
              <li>FAQs</li>
              <li>Contact</li>
              <li>careers</li>
            </ul>
          </div>
          <div className="glass">
            <h3 className="font-bold tracking-widest mb-8">GLASS</h3>
            <ul className="space-y-2 text-[12px]">
              <li>Shower</li>
              <li>Mirror</li>
              <li>Auto Glass</li>
              <li>Windows</li>
              <li>Custom/Decorative</li>
            </ul>
          </div>
          <div className="paint">
            <h3 className="font-bold tracking-widest mb-8">PAINT</h3>
            <ul className="space-y-2 text-[12px]">
              <li>Exterior</li>
              <li>Interior</li>
              <li>Auto Paint</li>
            </ul>
          </div>
          <div className="doors">
            <h3 className="font-bold tracking-widest mb-8">DOORS</h3>
            <ul className="space-y-2 text-[12px]">
              <li>Residential</li>
              <li>Commercial</li>
              <li>Garage Doors</li>
            </ul>
          </div>
        </div>
        <div className="search flex flex-col justify-end items-end">
          <div className="searchbar flex relative">
            <FaSearch className="w-4 h-4 mr-2 text-white absolute bottom-3" />
            <input type="text" className="bg-transparent border pl-8 border-white border-b-2 border-t-0 border-l-0 border-r-0 focus:shadow-none text-white" />
          </div>
          <button className="bg-[#A5EBCD] flex items-center mt-4 py-2 px-4 rounded font-medium">Get a Quote <FaArrowRight className="w-3 h-3 ml-2" /> </button>
        </div>
      </div>
      <div className="copyright container mx-auto px-4 flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center pb-8 text-white">
        <img src="/assets/images/logo.png" className="md:flex hidden" alt="" />
        <p className="text-[12px]">© 2026 Jones Paint & Glass. All rights reserved.</p>
        <div className="social flex space-x-4">
          <img src='/assets/images/linkedin.png' className="w-6 h-6 text-blue-600 cursor-pointer" />
          <img src='/assets/images/facebook.png' className="w-6 h-6 text-pink-500 cursor-pointer" />
          <img src='/assets/images/instagram.png' className="w-6 h-6 text-sky-500 cursor-pointer" />
          <img src='/assets/images/x.png' className="w-6 h-6 text-blue-700 cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
