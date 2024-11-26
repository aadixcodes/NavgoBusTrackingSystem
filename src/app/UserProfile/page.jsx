// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import styles from './userprofile.module.css';
// import { FaArrowLeft, FaUser } from 'react-icons/fa';

// const UserProfile = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       setIsLoading(true);
//       try {
//         // Simulated API call
//         const response = await new Promise(resolve => setTimeout(() => resolve({
//           name: 'Aditya Patel',
//           enrollmentNo: '23100BTCSE',
//           username: 'adityap09',
//           email: 'developer.aditya09@example.com',
//           busStop: 'Marimata',
//           mobileNo: '97555XXXXX'
//         }), 1500)); // Simulating a 1.5 second delay
//         setUserInfo(response);
//       } catch (error) {
//         console.error('Error fetching user info:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className={styles.loader}>
//         <div className={styles.spinner}></div>
//         <p>Loading user profile...</p>
//       </div>
//     );
//   }

//   if (!userInfo) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.subHeader}>
//           <Link href="/Navgo" className={styles.backButton}>
//             <FaArrowLeft /> 
//           </Link>
//           <h1 className='text-[25px] font-[600]'>User Profile</h1>
//         </div>
//         <div className={styles.errorMessage}>
//           Failed to load user profile. Please try again later.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.subHeader}>
//         <Link href="/Navgo" className={styles.backButton}>
//           <FaArrowLeft /> 
//         </Link>
//         <h1 className='text-[25px] font-[600]'>User Profile</h1>
//       </div>
//       <div className={styles.profileCard}>
//         <div className={styles.avatar}>
//           <FaUser />
//         </div>
//         <div className={styles.userInfo}>
//           <InfoItem label="Name" value={userInfo.name} />
//           <InfoItem label="Enrollment No." value={userInfo.enrollmentNo} />
//           <InfoItem label="Username" value={userInfo.username} />
//           <InfoItem label="Email id" value={userInfo.email} />
//           <InfoItem label="Bus Stop" value={userInfo.busStop} />
//           <InfoItem label="Mobile no." value={userInfo.mobileNo} />
//         </div>
//       </div>
//     </div>
//   );
// };

// const InfoItem = ({ label, value }) => (
//   <div className={styles.infoItem}>
//     <span className={styles.label}>{label} : </span>
//     <span className={styles.value}>{value}</span>
//   </div>
// );

// export default UserProfile;


// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { FaArrowLeft, FaUser, FaEdit } from 'react-icons/fa';
// import styles from './userprofile.module.css';

// const UserProfile = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editableUserInfo, setEditableUserInfo] = useState({});

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       setIsLoading(true);
//       try {
//         const response = await new Promise(resolve => setTimeout(() => resolve({
//           name: 'Aditya Patel',
//           enrollmentNo: '23100BTCSE',
//           username: 'adityap09',
//           email: 'developer.aditya09@example.com',
//           busStop: 'Marimata',
//           mobileNo: '97555XXXXX'
//         }), 1500));
//         setUserInfo(response);
//         setEditableUserInfo(response); // Initialize editable fields
//       } catch (error) {
//         console.error('Error fetching user info:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     setUserInfo(editableUserInfo); // Save changes
//     setIsEditing(false);
//   };

//   const handleCancelClick = () => {
//     setEditableUserInfo(userInfo); // Discard changes
//     setIsEditing(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditableUserInfo(prev => ({ ...prev, [name]: value }));
//   };

//   if (isLoading) {
//     return (
//       <div className={styles.loader}>
//         <div className={styles.spinner}></div>
//         <p>Loading user profile...</p>
//       </div>
//     );
//   }

//   if (!userInfo) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.subHeader}>
//           <Link href="/Navgo" className={styles.backButton}>
//             <FaArrowLeft /> 
//           </Link>
//           <h1 className='text-[25px] font-[600]'>User Profile</h1>
//         </div>
//         <div className={styles.errorMessage}>
//           Failed to load user profile. Please try again later.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.subHeader}>
//         <Link href="/Navgo" className={styles.backButton}>
//           <FaArrowLeft /> 
//         </Link>
//         <h1 className='text-[25px] font-[600]'>User Profile</h1>
//       </div>
//       <div className={styles.profileCard}>
//         <div className={styles.avatar}>
//           <FaUser />
//         </div>
//         <div className={styles.userInfo}>
//           <div className={styles.editButtonContainer}>
//             <InfoItem 
//               label="Name" 
//               value={editableUserInfo.name} 
//               isEditing={isEditing} 
//               onChange={handleInputChange} 
//               name="name" 
//             />
//             <button onClick={handleEditClick} className={styles.editButton}>
//               <FaEdit />
//             </button>
//           </div>
//           <InfoItem label="Enrollment No." value={editableUserInfo.enrollmentNo} isEditing={isEditing} onChange={handleInputChange} name="enrollmentNo" />
//           <InfoItem label="Username" value={editableUserInfo.username} isEditing={isEditing} onChange={handleInputChange} name="username" />
//           <InfoItem label="Email id" value={editableUserInfo.email} isEditing={isEditing} onChange={handleInputChange} name="email" />
//           <InfoItem label="Bus Stop" value={editableUserInfo.busStop} isEditing={isEditing} onChange={handleInputChange} name="busStop" />
//           <InfoItem label="Mobile no." value={editableUserInfo.mobileNo} isEditing={isEditing} onChange={handleInputChange} name="mobileNo" />

//           {isEditing && (
//             <div className={styles.buttonGroup}>
//               <button onClick={handleSaveClick} className={styles.saveButton}>Save</button>
//               <button onClick={handleCancelClick} className={styles.cancelButton}>Cancel</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const InfoItem = ({ label, value, isEditing, onChange, name }) => (
//   <div className={styles.infoItem}>
//     <span className={styles.label}>{label} : </span>
//     {isEditing ? (
//       <input 
//         type="text" 
//         name={name} 
//         value={value} 
//         onChange={onChange} 
//         className={styles.inputField} 
//       />
//     ) : (
//       <span className={styles.value}>{value}</span>
//     )}
//   </div>
// );

// export default UserProfile;


'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaUser, FaEdit } from 'react-icons/fa';
import styles from './userprofile.module.css';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUserInfo, setEditableUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const response = await new Promise(resolve => setTimeout(() => resolve({
          name: 'Aditya Patel',
          enrollmentNo: '23100BTCSE',
          username: 'adityap09',
          email: 'developer.aditya09@example.com',
          busStop: 'Marimata',
          mobileNo: '97555XXXXX'
        }), 1500));
        setUserInfo(response);
        setEditableUserInfo(response);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUserInfo(editableUserInfo);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditableUserInfo(userInfo);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUserInfo(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Loading user profile...</p>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className={styles.container}>
        <div className={styles.subHeader}>
          <Link href="/Navgo" className={styles.backButton}>
            <FaArrowLeft /> 
          </Link>
          <h1 className='text-[25px] font-[600]'>User Profile</h1>
        </div>
        <div className={styles.errorMessage}>
          Failed to load user profile. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.subHeader}>
        <Link href="/Navgo" className={styles.backButton}>
          <FaArrowLeft /> 
        </Link>
        <h1 className='text-[25px] font-[600]'>User Profile</h1>
      </div>
      <div className={styles.profileCard}>
        <div className={styles.editIcon} onClick={handleEditClick}>
          <FaEdit />
        </div>
        <div className={styles.avatar}>
          <FaUser />
        </div>
        <div className={styles.userInfo}>
          <InfoItem label="Name" value={editableUserInfo.name} isEditing={isEditing} onChange={handleInputChange} name="name" />
          <InfoItem label="Enrollment No." value={editableUserInfo.enrollmentNo} isEditing={isEditing} onChange={handleInputChange} name="enrollmentNo" />
          <InfoItem label="Username" value={editableUserInfo.username} isEditing={isEditing} onChange={handleInputChange} name="username" />
          <InfoItem label="Email id" value={editableUserInfo.email} isEditing={isEditing} onChange={handleInputChange} name="email" />
          <InfoItem label="Bus Stop" value={editableUserInfo.busStop} isEditing={isEditing} onChange={handleInputChange} name="busStop" />
          <InfoItem label="Mobile no." value={editableUserInfo.mobileNo} isEditing={isEditing} onChange={handleInputChange} name="mobileNo" />

          {isEditing && (
            <div className={styles.buttonGroup}>
              <button onClick={handleSaveClick} className={styles.saveButton}>Save</button>
              <button onClick={handleCancelClick} className={styles.cancelButton}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, isEditing, onChange, name }) => (
  <div className={styles.infoItem}>
    <span className={styles.label}>{label} : </span>
    {isEditing ? (
      <input 
        type="text" 
        name={name} 
        value={value} 
        onChange={onChange} 
        className={styles.inputField} 
      />
    ) : (
      <span className={styles.value}>{value}</span>
    )}
  </div>
);

export default UserProfile;
