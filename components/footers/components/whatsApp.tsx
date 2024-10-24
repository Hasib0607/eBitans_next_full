// components/WhatsAppIcon.js
import React from 'react';
import Image from 'next/image';
import whatsapp2 from './../../../assets/img/icons/whatsApp_icon.webp';
import useTheme from '@/hooks/use-theme';

const WhatsApp = () => {
  const { headerSetting } = useTheme();

  // Check if whatsapp_phone exists
  const hasWhatsAppPhone = headerSetting?.whatsapp_phone;

  return (
    hasWhatsAppPhone && ( // Render the icon only if whatsapp_phone is available
      <a
        className="fixed bottom-16 left-12 z-50"
        href={`https://api.whatsapp.com/send?phone=${hasWhatsAppPhone}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image 
          src={whatsapp2}
          alt="WhatsApp Chat"
          className="w-16 h-16 animate-pulse"
          width={64}
          height={64}
        />
      </a>
    )
  );
};

export default WhatsApp;
