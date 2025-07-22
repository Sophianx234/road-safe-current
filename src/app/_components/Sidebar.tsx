'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaCarAlt, FaChevronDown } from 'react-icons/fa';
import {
  MdOutlineDashboard,
  MdOutlineMap,
  MdOutlineCarRental,
  MdOutlineNotificationsNone,
  MdOutlineSettings,
} from 'react-icons/md';
import clsx from 'clsx';
import Image from 'next/image';

const navItems = [
  { icon: MdOutlineDashboard, href: '/dashboard' },
  { icon: MdOutlineMap, href: '/maps' },
  { icon: MdOutlineCarRental, href: '/fleet' },
  { icon: MdOutlineNotificationsNone, href: '/notifications' },
  { icon: MdOutlineSettings, href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className=" px-4 bg-white h-dvh justify-between  flex flex-col items-center py-6  shadow-md         border border-gray-200   ">
      {/* Logo */}
      <div>
        <div className="flex items-center flex-col justify-center   ">
          
          <FaCarAlt className="text-orange-500 w-6 h-6" />
          <p className='flex flex-col items-center -space-y-2 justify-center'>

          <span className='text-sm font-bold text-gray-800 font-bebas'>Road</span>
          <span className="text-sm font-bold text-gray-800 font-bebas  "> Safe.</span>
          </p>
        </div>
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col gap-6">
        {navItems.map(({ icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'p-3 rounded-lg hover:bg-orange-100 transition-colors',
                isActive ? 'bg-orange-500 text-white' : 'text-gray-500'
              )}
            >
              <Icon className="text-2xl" />
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col self-end justify-center items-center space-x-3">
              <div className="flex items-center space-x-2 flex-col justify-center bg-gray-100 rounded-full   cursor-pointer hover:bg-gray-200">
                <div className='relative rounded-full overflow-hidden size-11'>
      
                <Image
                  src="/images/user-1.jpg" // Replace with actual profile image URL
                  alt="Admin"
                  fill
                  className=" object-cover"
                  />
                  </div>
                
              </div>
            </div>
    </aside>
  );
}
