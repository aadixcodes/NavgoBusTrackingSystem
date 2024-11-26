// 'use client';
// import React, { useState, useEffect } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import Link from "next/link";
// import styles from "./noticeboard.module.css";

// const NoticeBoard = () => {
//   const currentDate = new Date().toLocaleDateString();
//   const [notices, setNotices] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchNotices = async () => {
//       setIsLoading(true);
//       try {
//         // Simulated API call
//         const response = await new Promise((resolve) =>
//           setTimeout(
//             () =>
//               resolve([
//                 "Important meeting on Friday at 2 PM in the conference room.",
//                 "Please submit your quarterly reports by end of day.",
//                 "Office will be closed on Monday for the national holiday.",
//                 "New safety protocols will be implemented starting next week.",
//               ]),
//             1500
//           )
//         );
//         setNotices(response);
//       } catch (error) {
//         console.error("Error fetching notices:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchNotices();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className={styles.loader}>
//         <div className={styles.spinner}></div>
//         <p>Loading notices...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.noticeBoardContainer}>
//         <div className={styles.header}>
//           <Link href="/Navgo" className={styles.backButton}>
//             <FaArrowLeft />
//           </Link>
//           <h1 className="text-[25px] font-[600]">Notice Board</h1>
//         </div>
//         <div className={styles.noticesContainer}>
//           {notices.length > 0 ? (
//             notices.map((notice, index) => (
//               <div key={index} className={styles.notice}>
//                 <div className={styles.currentDate}>{currentDate}</div> <br />
//                 {notice}
//               </div>
//             ))
//           ) : (
//             <div className={styles.noNotices}>
//               No notices available at this time.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoticeBoard;

'use client';

import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import styles from "./noticeboard.module.css";

const NoticeBoard = () => {
  const currentDate = new Date().toLocaleDateString();
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [newNotice, setNewNotice] = useState({ date: '', content: '' });

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        // Simulated API call
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve([
                "Important meeting on Friday at 2 PM in the conference room.",
                "Please submit your quarterly reports by end of day.",
                "Office will be closed on Monday for the national holiday.",
                "New safety protocols will be implemented starting next week.",
              ]),
            1500
          )
        );
        setNotices(response);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const handleAddNotice = () => {
    setShowPopup(true);
  };

  const handleSendNotice = () => {
    if (newNotice.date && newNotice.content) {
      setNotices([`${newNotice.date}: ${newNotice.content}`, ...notices]);
      setNewNotice({ date: '', content: '' });
      setShowPopup(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Loading notices...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.noticeBoardContainer}>
        <div className={styles.header}>
          <Link href="/Navgo" className={styles.backButton}>
            <FaArrowLeft />
          </Link>
          <h1 className="text-[25px] font-[600]">Notice Board</h1>
          <button onClick={handleAddNotice} className={styles.addButton}>
            Add Notice
          </button>
        </div>
        <div className={styles.noticesContainer}>
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <div key={index} className={styles.notice}>
                {notice}
              </div>
            ))
          ) : (
            <div className={styles.noNotices}>
              No notices available at this time.
            </div>
          )}
        </div>
      </div>
      {showPopup && (
  <div className={styles.popup}>
    <div className={styles.popupContent}>
      <h2>Add New Notice</h2>
      <div className={styles.popupRow}>
        {/* <label>Date:</label> */}
        <input
          type="date"
          value={newNotice.date}
          onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
          className={styles.dateInput}
        />
      </div>
      <div className={styles.popupRow}>
        {/* <label>Message:</label> */}
        <textarea
          placeholder="Enter notice content"
          value={newNotice.content}
          onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
          className={styles.messageInput}
        />
      </div>
      <div className={styles.popupButtons}>
        <button onClick={handleSendNotice} className={styles.sendButton}>Send Notice</button>
        <button onClick={() => setShowPopup(false)} className={styles.cancelButton}>Cancel</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default NoticeBoard;
