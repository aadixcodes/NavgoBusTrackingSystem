// 'use client';
// import React from "react";

// const Hero = () => {
//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* Video Container with proper aspect ratio maintenance */}
//       <div className="absolute inset-0 w-full h-full">
//         <video 
//           autoPlay 
//           loop 
//           muted 
//           playsInline
//           className="absolute top-[45%] left-1/2 w-auto 
//                      transform -translate-x-1/2 -translate-y-1/2 object-cover"
//           style={{
//             width: '100%',
//             height: '90%',
//             objectFit: 'cover',
//             objectPosition: 'center'
//           }}
//         >
//           <source src="./Assets/BusAnima.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//     </div>
//   );
// };

// export default Hero;



'use client';
import React from "react";
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.videoWrapper}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className={styles.heroVideo}
        >
          <source src="./Assets/BusAnima.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Hero;
