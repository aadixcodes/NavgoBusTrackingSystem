// import React from 'react'
// import Image from 'next/image';
// import { Bell, CheckCircle, Clock, MapPin, Phone, User, Route } from 'lucide-react';

// const features = [
//   {
//     icon: MapPin,
//     title: "Live Location Tracking",
//     description: "View buses' real-time locations on a map for accurate arrival times and better travel planning."
//   },
//   {
//     icon: Route,
//     title: "Dynamic Bus Routing",
//     description: "Students often face the inconvenience of checking the notice board daily for bus number and route changes,disrupting their routine and causing unnecessaryhassle"
//   },
//   {
//     icon: CheckCircle,
//     title: "Bus Information Management",
//     description: "Accessing detailed information about bus drivers and conductors is made simple through a user-friendly interface,ensuring students have comprehensive details attheir fingertips."
//   }
// ];

// const parentFeatures = [
//   {
//     icon: User,
//     title: "Driver Information System",
//     description: "Maintains driver records, schedules, and performance data for accountability and efficient operations."
//   },
//   {
//     icon: Bell,
//     title: "Smart Arrival Notification",
//     description: "Instant notifications about bus arrivals and delays keep passengers informed and on schedule."
//   },
//   {
//     icon: Clock,
//     title: "Bus Maintenance Record Keeping",
//     description: "Tracks bus maintenance history to ensure safety, reliability, and well-maintained vehicles."
//   }
// ];

// const FeatureCard = ({ Icon, title, description }) => (
//   <div className="flex items-start space-x-4">
//     <div className="bg-yellow-400 text-white rounded-full p-3 flex-shrink-0">
//       <Icon size={24} />
//     </div>
//     <div>
//       <h2 className="text-xl font-bold text-blue-900">{title}</h2>
//       <div className="h-1 w-8 bg-yellow-400 mt-1 mb-2"></div>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   </div>
// );

// const LandingFeatures = () => {
//   return (
//     <main className="min-h-screen bg-white">
//       <div className="container mx-auto px-4 py-12">
//         {/* Headings Row */}
//         <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16">
//           {/* First Heading */}
//           <div className="md:w-1/2">
//             <h1 className="text-4xl font-bold text-gray-900">
//               Navgo does all<br />the hard work
//             </h1>
//             <div className="mt-4">
//               <div className="h-1 w-16 bg-yellow-400"></div>
//             </div>
//           </div>

//           {/* Second Heading */}
//           <div className="md:w-1/2">
//             <h2 className="text-3xl font-bold text-gray-900">
//             NavGo: Making College Transport Easy.
//             </h2>
//             <p className="text-gray-600 mt-4">
//             NavGo handles the details of College bus management so you can focus on your students. With NavGo, enjoy safe, smooth, and efficient transportation—leaving you free to invest in their learning and growth.
//             </p>
//           </div>
//         </div>

//         {/* Three Columns Row */}
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
//           {/* Left Features Column */}
//           <div className="lg:w-1/3 space-y-8">
//             {features.map((feature, index) => (
//               <FeatureCard
//                 key={index}
//                 Icon={feature.icon}
//                 title={feature.title}
//                 description={feature.description}
//               />
//             ))}
//           </div>

//           {/* Center Image Column */}
//           <div className="lg:w-1/3 flex justify-center items-start">
//             <div className="relative  h-auto mx-auto">
//               <img
//                 src="/Assets/Navgo.svg"
//                 alt="SafeBus app on mobile phone"
//                 className="w-[80rem] h-[40rem]"
//               />
//             </div>
//           </div>

//           {/* Right Features Column */}
//           <div className="lg:w-1/3 space-y-8">
//             {parentFeatures.map((feature, index) => (
//               <FeatureCard
//                 key={index}
//                 Icon={feature.icon}
//                 title={feature.title}
//                 description={feature.description}
//               />
//             ))}
//             <div className="pt-4">
//               <a
//                 href="/features"
//                 className="text-[#002E5B] font-bold inline-flex items-center hover:text-blue-800 transition-colors"
//               >
//                 Features »
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default LandingFeatures;


// LandingFeatures.tsx
import React from 'react'
import Image from 'next/image';
import { Bell, CheckCircle, Clock, MapPin, Phone, User, Route } from 'lucide-react';
import styles from './LandingFeatures.module.css';

const features = [
  {
    icon: MapPin,
    title: "Live Location Tracking",
    description: "View buses' real-time locations on a map for accurate arrival times and better travel planning."
  },
  {
    icon: Route,
    title: "Dynamic Bus Routing",
    description: "Students often face the inconvenience of checking the notice board daily for bus number and route changes,disrupting their routine and causing unnecessaryhassle"
  },
  {
    icon: CheckCircle,
    title: "Bus Information Management",
    description: "Accessing detailed information about bus drivers and conductors is made simple through a user-friendly interface,ensuring students have comprehensive details attheir fingertips."
  }
];

const parentFeatures = [
  {
    icon: User,
    title: "Driver Information System",
    description: "Maintains driver records, schedules, and performance data for accountability and efficient operations."
  },
  {
    icon: Bell,
    title: "Smart Arrival Notification",
    description: "Instant notifications about bus arrivals and delays keep passengers informed and on schedule."
  },
  {
    icon: Clock,
    title: "Bus Maintenance Record Keeping",
    description: "Tracks bus maintenance history to ensure safety, reliability, and well-maintained vehicles."
  }
];

const FeatureCard = ({ Icon, title, description }) => (
  <div className={styles.featureCard}>
    <div className={styles.iconWrapper}>
      <Icon size={24} />
    </div>
    <div>
      <h2 className={styles.featureTitle}>{title}</h2>
      <div className={styles.featureDivider}></div>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  </div>
);

const LandingFeatures = () => {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.container}>
        {/* Headings Row */}
        <div className={styles.headingsRow}>
          {/* First Heading */}
          <div className={styles.firstHeadingColumn}>
            <h1 className={styles.mainHeading}>
              Navgo does all<br />the hard work
            </h1>
            <div className={styles.headingDivider}></div>
          </div>

          {/* Second Heading */}
          <div className={styles.secondHeadingColumn}>
            <h2 className={styles.secondaryHeading}>
            NavGo: Making College Transport Easy.
            </h2>
            <p className={styles.headingDescription}>
            NavGo handles the details of College bus management so you can focus on your students. With NavGo, enjoy safe, smooth, and efficient transportation—leaving you free to invest in their learning and growth.
            </p>
          </div>
        </div>

        {/* Three Columns Row */}
        <div className={styles.columnsContainer}>
          {/* Left Features Column */}
          <div className={styles.leftFeaturesColumn}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                Icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          {/* Center Image Column */}
          <div className={styles.centerImageColumn}>
            <div className={styles.imageWrapper}>
              <img
                src="/Assets/Navgo.svg"
                alt="SafeBus app on mobile phone"
                className={styles.centerImage}
              />
            </div>
          </div>

          {/* Right Features Column */}
          <div className={styles.rightFeaturesColumn}>
            {parentFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                Icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
            <div className={styles.featuresLinkContainer}>
              <a
                href="/features"
                className={styles.featuresLink}
              >
                Features »
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingFeatures;
