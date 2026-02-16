import React, { useState, useEffect } from 'react';

// Toast Component
const Toast = ({ message, type = 'info', duration = 5000, onClose }) => {
  useEffect(() => {
    // Auto-close the toast after the specified duration
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [duration, onClose]);

  // Determine the background color based on the toast type
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#4caf50'; // Green
      case 'error':
        return '#f44336'; // Red
      case 'warning':
        return '#ff9800'; // Orange
      case 'info':
      default:
        return '#2196f3'; // Blue
    }
  };

  const styles = {
    container: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: getBackgroundColor(),
      color: '#fff',
      padding: '15px 25px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      zIndex: 999999,
      minWidth: '200px',
      textAlign: 'center',
    },
  };

  return <div style={styles.container}>{message}</div>;
};

export default Toast;
