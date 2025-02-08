import { useState } from "react";
import styles from "@/components/Chat/contact.module.css";
import 'font-awesome/css/font-awesome.min.css';
import { FaComments, FaTimes } from "react-icons/fa";
import useTheme from "@/hooks/use-theme";

const FloatingContact = () => {
  const { headerSetting } = useTheme();

  // Check if whatsapp_phone and phone exist
  const wphoneNumber = headerSetting?.whatsapp_phone;
  const phoneNumber = headerSetting?.phone;
  const [isOpen, setIsOpen] = useState(false);
  // const message = "আমি eBitans এবং এর সার্ভিস সম্পর্কে বিস্তারিত জানতে চাই?";

  const toggleServices = () => {
    setIsOpen(!isOpen); // Toggle icons visibility
  };

  // Hide the entire floating button and icons if both numbers are missing
  if (!wphoneNumber && !phoneNumber) {
    return null;
  }

  return (
    <div id="sy-whatshelp" className={styles.whatshelp}>
      {!isOpen && <div className={styles.openServicesTooltip}>Contact Us</div>}

      {/* Floating service icons */}
      <div className={`${styles.services} ${isOpen ? styles.active : ""}`}>
        {wphoneNumber && (
          <a
            href={`https://wa.me/${wphoneNumber}`}
            className={`${styles.serviceItem} ${styles.whatsapp}`}
            title="WhatsApp"
          >
            <i className="fa fa-whatsapp"></i>
          </a>
        )}
        {phoneNumber && (
          <a href={`tel:${phoneNumber}`} className={`${styles.serviceItem} ${styles.call}`} title="Call">
            <i className="fa fa-phone"></i>
          </a>
        )}
      </div>

      {/* Floating button that toggles icons */}
      <button onClick={toggleServices} className={styles.openServices} title="Contact Us">
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>
    </div>
  );
};

export default FloatingContact;
