'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  MdOutlineDashboard,
  MdOutlineMap,
  MdOutlineSettings,
} from 'react-icons/md';
import { GiArtificialHive } from 'react-icons/gi';
import clsx from 'clsx';

// ✅ Make sure hrefs include the leading slash `/`
const navItems = [
  // { icon: MdOutlineDashboard, href: '/main/dashboard' },
  { icon: MdOutlineMap, href: '/main/map' },
  { icon: GiArtificialHive, href: '/main/ai' },
  { icon: MdOutlineSettings, href: '/main/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname)

  return (
    <aside className="px-4  bg-white flex flex-col items-center py-6 shadow-md fixed top-20 left-0 my-2 inset-y-0 border border-gray-200">
      {/* Navigation Icons */}
      <nav className="flex flex-col gap-6">
        {navItems.map(({ icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'p-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-orange-500 text-white shadow'
                  : 'text-gray-500 hover:bg-orange-100'
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
