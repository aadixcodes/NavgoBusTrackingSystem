"use client";

// import styles from "./navbar.module.css";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
    <div className="relative">
      <nav className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out shadow-md
        ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}
      `}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center my-[5px] justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                alt="SafeBus logo"
                className="h-[5rem] w-[7.5rem] sm:h-[6rem] sm:w-[9rem] md:h-[8rem] md:w-[10rem]"
                src="/Assets/NavgoLogoo.svg"
                width={32}
                height={32}
              />
              {/* <span className="ml-2 text-4xl text-[##002E5B] font-bold">Navgo</span> */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link className="text-lg text-[##002E5B] font-bold-[600] hover:text-yellow-400 transition duration-300" href="/BusBoard">
                Bus Board
              </Link>
              <Link className="text-lg text-[##002E5B] font-bold-[600] hover:text-yellow-400 transition duration-300" href="/AboutUs">
                About Us
              </Link>
              <Link className="text-lg text-[##002E5B] font-bold-[600] hover:text-yellow-400 transition duration-300" href="/Notification">
                Notification
              </Link>
              <Link className="text-lg text-[##002E5B] font-bold-[600] hover:text-yellow-400 transition duration-300" href="/Login">
                Sign in
              </Link>
              <Link className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 font-bold transition duration-300" href="/Signup">
                Sign up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none transition duration-300"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            md:hidden
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen 
              ? 'max-h-96 opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'}
          `}
        >
          <div className="px-4 text-center pt-2 ml-[10px] pb-4 space-y-3 bg-white shadow-lg">
            <Link className="block text-lg text-gray-800 hover:text-yellow-400 transition duration-300" href="/BusBoard">
              Bus Board
            </Link>
            <Link className="block text-lg text-gray-800 hover:text-yellow-400 transition duration-300" href="/AboutUs">
              About Us
            </Link>
            <Link className="block text-lg text-gray-800 hover:text-yellow-400 transition duration-300" href="/Notification">
              Notification
            </Link>
            <Link className="block text-lg text-gray-800 hover:text-yellow-400 transition duration-300" href="/Login">
              Sign In
            </Link>
            <Link className="block px-4 py-2 bg-yellow-400 text-black rounded font-bold hover:bg-yellow-300 transition duration-300 text-center" href="Signup">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16"></div>
    </div>
    </>
  );
};

export default Navbar;