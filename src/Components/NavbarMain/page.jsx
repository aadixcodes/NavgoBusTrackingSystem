// import React, { useState } from 'react';
// import { FaSearch, FaUser, FaBars } from "react-icons/fa";
// import Link from "next/link";
// import Sidebar from '../Sidebar/page';

// const NavbarMain = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       <nav className="w-full bg-white shadow-lg">
//         <div className="w-full px-4">
//           <div className="flex items-center justify-between h-16">
//             {/* Left side - Menu Button */}
//             <div className="flex items-center">
//               <button
//                 onClick={toggleSidebar}
//                 className="w-10 h-10 flex items-center justify-center bg-yellow-400 rounded-full text-black hover:bg-yellow-300 transition-colors"
//               >
//                 <FaBars size={20} />
//               </button>
//             </div>

//             {/* Center - Logo */}
//             <div className="flex-1 flex justify-center">
//               <h1 className="text-2xl md:text-3xl font-semibold text-black">
//                 Navgo
//               </h1>
//             </div>

//             {/* Right side - Search Bar and Profile Icon */}
//             <div className="flex items-center gap-3">
//               <div className="relative hidden sm:block">
//                 <input
//                   type="text"
//                   placeholder="Search bus and route no."
//                   className="w-48 md:w-64 h-9 pl-9 pr-4 rounded-full text-sm
//                     border-2 border-yellow-200
//                     focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 />
//                 <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               </div>
//               <div className="w-10 h-10 flex items-center justify-center bg-yellow-400 rounded-full hover:bg-yellow-300 transition-colors">
//                 <FaUser size={20} className="text-black" />
//               </div>
//             </div>
//           </div>

//           {/* Mobile Search Bar */}
//           <div className="sm:hidden pb-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search bus and route no."
//                 className="w-full h-9 pl-9 pr-4 rounded-full text-sm
//                   border-2 border-yellow-200
//                   focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               />
//               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             </div>
//           </div>
//         </div>
//       </nav>
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//     </>
//   );
// };

// export default NavbarMain;

import React, { useState } from "react";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";
import Link from "next/link";
import Sidebar from "../Sidebar/page";

const NavbarMain = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <>
      <nav className="w-full bg-white shadow-lg">
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Menu Button */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="w-10 h-10 flex items-center justify-center bg-yellow-400 rounded-full text-black hover:bg-yellow-300 transition-colors"
              >
                <FaBars size={20} />
              </button>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center">
              {/* <h1 className="text-2xl md:text-3xl font-semibold text-black">
                Navgo
              </h1> */}
             <img
  alt="SafeBus logo"
  className="h-[5rem] w-[7.5rem] sm:h-[6rem] sm:w-[9rem] md:h-[8rem] md:w-[10rem]"
  src="/Assets/NavgoLogoo.svg"
  width={32}
  height={32}
/>
            </div>

            {/* Right side - Search Bar and Profile Icon */}
            <div className="flex items-center gap-3 relative">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search bus and route no."
                  className="w-48 md:w-64 h-9 pl-9 pr-4 rounded-full text-sm 
                    border-2 border-yellow-200
                    focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div
                onClick={toggleProfileMenu}
                className="w-10 h-10 flex items-center justify-center bg-yellow-400 rounded-full hover:bg-yellow-300 transition-colors cursor-pointer"
              >
                <FaUser size={20} className="text-black" />
              </div>

              {/* Profile Menu Popup */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-40 z-10">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link href="/UserProfile">Profile</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link href="/">Settings</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link href="/">Logout</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="sm:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bus and route no."
                className="w-full h-9 pl-9 pr-4 rounded-full text-sm
                  border-2 border-yellow-200
                  focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default NavbarMain;
