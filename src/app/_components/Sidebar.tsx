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
import clsx from 'clsx';

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
    <aside className="w-20 bg-white h-screen  flex flex-col items-center py-6 shadow-md fixed left-0 border border-gray-200  my-2">
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
