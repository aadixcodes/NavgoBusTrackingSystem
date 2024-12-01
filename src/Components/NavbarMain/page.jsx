import React, { useState } from "react";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";
import Link from "next/link";
import Sidebar from "../Sidebar/page";
import styles from './navbarmain.module.css';

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
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <div className={styles.navbarContent}>
            {/* Left side - Menu Button */}
            <div>
              <button
                onClick={toggleSidebar}
                className={styles.menuButton}
              >
                <FaBars size={20} />
              </button>
            </div>

            {/* Center - Logo */}
            <div className={styles.logoContainer}>
              <img
                alt="SafeBus logo"
                className={styles.logo}
                src="/Assets/NavgoLogoo.svg"
                width={32}
                height={32}
              />
            </div>

            {/* Right side - Search Bar and Profile Icon */}
            <div className={styles.rightSection}>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search bus and route no."
                  className={styles.searchInput}
                />
                <FaSearch className={styles.searchIcon} />
              </div>
              <div
                onClick={toggleProfileMenu}
                className={styles.profileButton}
              >
                <FaUser size={20} />
              </div>

              {/* Profile Menu Popup */}
              {isProfileMenuOpen && (
                <div className={styles.profileMenu}>
                  <ul className={styles.profileMenuList}>
                    <li className={styles.profileMenuItem}>
                      <Link href="/UserProfile">Profile</Link>
                    </li>
                    <li className={styles.profileMenuItem}>
                      <Link href="/">Settings</Link>
                    </li>
                    <li className={styles.profileMenuItem}>
                      <Link href="/">Logout</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className={styles.mobileSearchContainer}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search bus and route no."
                className={styles.mobileSearchInput}
              />
              <FaSearch className={styles.mobileSearchIcon} />
            </div>
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default NavbarMain;
