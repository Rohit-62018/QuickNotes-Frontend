import React, { useEffect, useState } from "react";

interface PopupProps {
  title: string;
  message: string;
}

const Popup: React.FC<PopupProps> = ({ title, message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`popup-container ${show ? "show" : "hide"}`}>
      <h3>Welcome, {title}</h3>
      <p >{message}</p>
    </div>
  );
};

export default Popup;