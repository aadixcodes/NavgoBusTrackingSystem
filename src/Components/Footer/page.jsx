'use client';
import Link from 'next/link';
import styles from './footer.module.css';
import {  FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
import { useRouter } from 'next/navigation';


const Footer = () => {
  const router = useRouter();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h2 className={styles.logo}>Navgo</h2>
          <p className={styles.slogan}>Smart Bus Tracking</p>
        </div>
        
        <nav className={styles.navigation}>
          <div className={styles.navColumn}>
            <h1 className='text-[20px] font-[600] mb-[5px]'>Useful Links</h1>
            <hr className='mb-[12px]'/>
            <Link href={`/DriversProfile?referrer=${router.asPath}`}>Drivers Information</Link>
            <Link href="/Notification">Notification</Link>
            <Link href="/ContactUs">Contact Us</Link>
          <Link href="/AboutUs">About Us</Link>
            
          </div>
          <div className={styles.navColumn}>
          <h1 className='text-[20px] font-[600] mb-[5px]'>Other Links</h1>
          <hr className='mb-[15px]'/>
            <Link href="/Assets/busroute.pdf" target='_blank'>Bus Route</Link>
            <Link href="/BusBoard">Bus Board</Link>
          </div>
          <div className={styles.navColumn}>
          <h1 className='text-[20px] font-[600] mb-[5px]'>Contact Us</h1>
          <hr className='mb-[12px]'/>
          <p>+91 70676 63661</p>
          </div>
        </nav>
      </div>
      <hr  className='w-[70%] h-[2px] m-auto  mt-[25px] bg-black'/>
      <div className={styles.socialSection}>
        <h1 className='text-[25px] font-bold'>Social Connect</h1>
        <div className={styles.socialIcons}>
          <a href="https://www.instagram.com/abhyudayacodingclub/" target='_blank'><FaInstagram /></a>
          <a href="https://api.whatsapp.com/send?phone=6266061914&text=Hello!%20I%20want%20to%20know%20about...%20" target='_blank'><FaWhatsapp    /></a>
          <a href="https://www.linkedin.com/company/abhyudaya-coding-club/" target='_blank'><FaLinkedinIn   /></a>
          <a href="https://x.com/abhyudaya_club" target='_blank'><FaXTwitter /></a>
        </div>
        <p className={styles.copyright}>&copy; 2024 Abhyudaya Coding Club. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;