"use client";

import { useState, useEffect } from 'react';
import styles from "./notify.module.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [newNotification, setNewNotification] = useState({ date: '', content: '' });

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await new Promise(resolve => setTimeout(() => resolve([
          {
            date: 'Today',
            content: `Bus no. 1 arrive aurbindo in 5 minutes`
          },
          {
            date: '22/june/2024',
            content: 'Hey, you have a new message from Navgo'
          }
        ]), 1000));
        setNotifications(response);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleAddNotification = () => {
    setShowPopup(true);
  };

  const handleSendNotification = () => {
    if (newNotification.date && newNotification.content) {
      setNotifications([newNotification, ...notifications]);
      setNewNotification({ date: '', content: '' });
      setShowPopup(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className={styles.notifi}>
        <div className={styles.notifiwrapper}>
          <i className="bx bxs-bell-ring"></i>
          <h1>No Notification Yet</h1>
          <br />
          <a
            href="/"
            className="relative text-[18px] px-6 py-1 rounded-[8px] border-2 border-[#05070f] bg-[#05070f] text-[#e8f0f9] duration-500 
            before:absolute before:w-full before:h-full before:transition-all before:duration-700 before:rounded-md 
            before:bg-[#e8f0f9] hover:bg-[#e8f0f9]  before:-z-10 before:scale-0 hover:before:scale-100 before:origin-center overflow-hidden 
            hover:text-[#05070f] cursor-pointer"
          >
            Go to Home Page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.nwrapper}>
      <div className={styles.notificontainer}>
        <div className={styles.header}>
          <h1>
            <i className="bx bxs-bell-ring"></i>Notifications
          </h1>
          <button onClick={handleAddNotification} className={styles.addButton}>
            Add Notification
          </button>
        </div>
        {notifications.map((notification, index) => (
          <div key={index} className={styles.notification}>
            <div className={styles.date}>
              <p>{notification.date}</p>
            </div>
            <div className={styles.content}>
              <p>{notification.content}</p>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Add New Notification</h2>
            <input
              type="date"
              value={newNotification.date}
              onChange={(e) => setNewNotification({ ...newNotification, date: e.target.value })}
              className={styles.dateInput}
            />
            <textarea
              value={newNotification.content}
              onChange={(e) => setNewNotification({ ...newNotification, content: e.target.value })}
              placeholder="Enter notification message"
              className={styles.messageInput}
            />
            <div className={styles.popupButtons}>
              <button onClick={handleSendNotification} className={styles.sendButton}>Send</button>
              <button onClick={() => setShowPopup(false)} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
