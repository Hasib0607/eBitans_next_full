import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";

const FollowUs = ({ cls, headerSetting, design }: any) => {
  const bgColor = design?.header_color;

  return (
    <>
      {headerSetting?.facebook_link && (
        <a
          href={`${headerSetting?.facebook_link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare style={{ color: bgColor }} className={cls} />
        </a>
      )}
      {headerSetting?.youtube_link && (
        <a
          href={`${headerSetting?.youtube_link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutubeSquare style={{ color: bgColor }} className={cls} />
        </a>
      )}
      {headerSetting?.instagram_link && (
        <a
          href={`${headerSetting?.instagram_link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagramSquare style={{ color: bgColor }} className={cls} />
        </a>
      )}
      {headerSetting?.whatsapp_phone && (
        <a
          href={`https://api.whatsapp.com/send?phone=${headerSetting?.whatsapp_phone}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsappSquare style={{ color: bgColor }} className={cls} />
        </a>
      )}
      {headerSetting?.lined_in_link && (
        <a
          href={`${headerSetting?.lined_in_link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillLinkedin style={{ color: bgColor }} className={cls} />
        </a>
      )}
    </>
  );
};

export default FollowUs;
