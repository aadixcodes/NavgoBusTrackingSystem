// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// const GetStartedComp = () => {
//   const features = [
//     {
//       src: "/Assets/bustrack.png",
//       alt: "Icon representing live fleet tracking",
//       text: "Live Location Tracking",
//     },
//     {
//       src: "/Assets/maintainancerecord.png",
//       alt: "Icon representing safety of school children",
//       text: "Bus Maintenance Record Keeping",
//     },
//     {
//       src: "/Assets/busrouting.png",
//       alt: "Icon representing route optimization",
//       text: "Dynamic Bus Routing",
//     },
//     {
//       src: "/Assets/smartnotification.svg",
//       alt: "Icon representing affordable pricing plans",
//       text: "Smart Arrival Notification",
//     },
//     {
//       src: "/Assets/businfomanage.png",
//       alt: "Icon representing variety of reports",
//       text: "Bus/Driver Information Management",
//     },
//   ];

//   return (
//     <div className="bg-white text-gray-800">
//       <div className="container mx-auto px-10 py-8">
//         <div className="text-left">
//           <h1 className="text-4xl font-bold mb-2">Get started with Navgo</h1>
//           <div className="flex justify-left mb-6">
//             <div className="w-20 h-1 bg-yellow-400"></div>
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2 mb-8 md:mb-0">
//             <h2 className="text-2xl font-bold mb-4">
//               Navgo is a platform to manage your Svvv College Buses with ease.
//             </h2>
//             <p className="mb-4">
//               A Bus Management System is a comprehensive software solution designed to streamline and optimize the operations of bus fleets, providing efficient management tools for fleet managers, drivers, and passengers.
//             </p>
//             <p className="mb-4">
//               This system integrates various features to enhance the overall efficiency, safety, and reliability of bus transportation services. Here is an overview of what a Bus Management System entails along with the highlighted features:
//             </p>
//           </div>
//           <div className="md:w-1/2 flex justify-center">
//             <Image
//               src="/Assets/getstarted.png"
//               alt="Illustration of a school bus with children inside and a cityscape in the background"
//               width={800}
//               height={900}
//               className="w-full max-w-md"
//             />
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-center mt-8">
//           {features.map((item, index) => (
//             <div key={index} className="w-1/2 md:w-1/5 text-center p-4">
//               <Image
//                 src={item.src}
//                 alt={item.alt}
//                 width={item.text === "Smart Arrival Notification" ? 80 : 100}
//                 height={item.text === "Smart Arrival Notification" ? 80 : 100}
//                 className="mx-auto mb-2"
//               />
//               <p>{item.text}</p>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-8">
//           {/* Link to the dedicated Features page */}
//           <Link href="/features" className="text-[#002E5B] font-bold">
//             Explore Features »
//           </Link>
//         </div>

//         <div className="text-center mt-8">
//           <Link href="/Navgo" className="bg-[#facc15] hover:bg-[#FDE047] rounded-[5px] text-black font-bold py-3 px-5 rounded-3 text-xl">
//             Get Started
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GetStartedComp;


'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './getStarted.module.css';

const GetStartedComp = () => {
  const features = [
    {
      src: "/Assets/bustrack.png",
      alt: "Icon representing live fleet tracking",
      text: "Live Location Tracking",
    },
    {
      src: "/Assets/maintainancerecord.png",
      alt: "Icon representing safety of school children",
      text: "Bus Maintenance Record Keeping",
    },
    {
      src: "/Assets/busrouting.png",
      alt: "Icon representing route optimization",
      text: "Dynamic Bus Routing",
    },
    {
      src: "/Assets/smartnotification.svg",
      alt: "Icon representing affordable pricing plans",
      text: "Smart Arrival Notification",
    },
    {
      src: "/Assets/businfomanage.png",
      alt: "Icon representing variety of reports",
      text: "Bus/Driver Information Management",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headerSection}>
          <h1 className={styles.mainTitle}>Get started with Navgo</h1>
          <div className={styles.titleUnderline}>
            <div className={styles.underline}></div>
          </div>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.textSection}>
            <h2 className={styles.subTitle}>
              Navgo is a platform to manage your Svvv College Buses with ease.
            </h2>
            <p className={styles.description}>
              A Bus Management System is a comprehensive software solution designed to streamline and optimize the operations of bus fleets, providing efficient management tools for fleet managers, drivers, and passengers.
            </p>
            <p className={styles.description}>
              This system integrates various features to enhance the overall efficiency, safety, and reliability of bus transportation services. Here is an overview of what a Bus Management System entails along with the highlighted features:
            </p>
          </div>
          <div className={styles.imageSection}>
            <Image
              src="/Assets/getstarted.png"
              alt="Illustration of a school bus with children inside and a cityscape in the background"
              width={800}
              height={900}
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.featuresContainer}>
          {features.map((item, index) => (
            <div key={index} className={styles.featureItem}>
              <Image
                src={item.src}
                alt={item.alt}
                width={item.text === "Smart Arrival Notification" ? 80 : 100}
                height={item.text === "Smart Arrival Notification" ? 80 : 100}
                className={styles.featureIcon}
              />
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <Link href="/features" className={styles.exploreLink}>
            Explore Features »
          </Link>
        </div>

        <div className={styles.ctaSection}>
          <Link href="/Navgo" className={styles.getStartedButton}>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStartedComp;
