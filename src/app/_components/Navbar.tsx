'use client';

import { useDashStore } from '@/store/dash-store';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { FaCarAlt, FaSearch } from 'react-icons/fa';
import { MdOutlineNotificationsNone } from 'react-icons/md';

export default function Navbar() {
  const { toggleNotifications} = useDashStore();
  return (
    <header className="z-50 bg-white  flex sticky top-0 items-center justify-between  px-6 py-4 shadow-2xs">
      <div>
        <div className="flex items-center space-x-2">
          
          <FaCarAlt className="text-orange-500 w-6 h-6" />
          <span className="text-xl font-bold  font-bebas  -space-x-2">Road Safe.</span>
        </div>
      </div>
      <div className="w-1/3 relative">
        <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-3">
        <MdOutlineNotificationsNone onClick={toggleNotifications} className='size-5 hover:text-orange-400 duration-150 transition-all'/>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-full pr-3  cursor-pointer hover:bg-gray-200">
          <div className='relative rounded-full overflow-hidden size-11'>

          <Image
            src="/images/user-1.jpg" // Replace with actual profile image URL
            alt="Admin"
            fill
            className=" object-cover"
            />
            </div>
          <div className="flex flex-col justify-center items-center text-right">
            <span className="text-sm font-medium text-gray-800">Diky Khan</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
