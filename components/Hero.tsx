import { truncateSync } from 'fs'
import React, { useEffect } from 'react'
import Anime,{anime} from 'react-animejs-wrapper'
 export default function Hero(){
  


  return (
    <div className="bg-[#FFC017] w-full flex items-center border-b border-black justify-center">
      <div className='xl:w-[65%]  lg:w-[90%] px-2 pt-2 mt-10 items-center  justify-between flex'>
        {/* left */}
        <div className='xl:w-[55%] lg:w-[65%] self-start px-1 pt-1'>
          <p className='text-7xl  font-serif break-words '>Medium is a place<br className='hidden lg:block' /> to write, read, and connect
          </p>
          <p className="font-sans font-medium mt-4  text-md text-gray-900">It's easy and free to post your
            thinking on any topic <br />and connect with millions of readers.</p>
          <button className='my-6 bg-white border-black border rounded-full px-5 py-2'> Start Writing</button>
        </div>
        {/* right */}
        <div className=" hidden md:flex flex-1 items-center justify-center px-1 pt-1">
         
     <img id="heroimage" className=" w-[600px]   h-[400px] object-contain self-center -mb-2.5 hidden md:inline-flex"
            src='https://ucarecdn.com/fe9c2170-3683-49eb-8ef8-f4c292835836/willowypeoplemakingbusinessstartup.png' />
          
            
        </div>
      </div>
    </div>
  )
}
