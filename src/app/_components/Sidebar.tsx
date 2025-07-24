'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaCarAlt } from 'react-icons/fa';
import {
  MdOutlineDashboard,
  MdOutlineMap,
  MdOutlineCarRental,
  MdOutlineNotificationsNone,
  MdOutlineSettings,
} from 'react-icons/md';

import { GiArtificialHive } from "react-icons/gi";

import clsx from 'clsx';

const navItems = [
  { icon: MdOutlineDashboard, href: '/dashboard' },
  { icon: MdOutlineMap, href: 'maps' },
  {icon: GiArtificialHive , href: 'ai'},
  { icon: MdOutlineSettings, href: 'settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className=" px-4 bg-white   flex flex-col items-center py-6 shadow-md fixed top-20 left-0 my-2   inset-y-0    border border-gray-200   ">
      {/* Logo */}
      

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
    </aside>
  );
}
