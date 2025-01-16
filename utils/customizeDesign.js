import { MdOutlineVerified } from "react-icons/md";

export const customizeFooter = [
  {
    // Fihamart
    id: 6747,
    googleMaps: true,
  },
  {
    // Fashion mart customization start
    id: 8203,
    support: "Customer Support: ",
    help_line: "Help Line: +880 1894-560311",
    // Fashion mart customization end
  },
  {
    // footer twenty-one
    id: 6227,
    free_shipping: true,
  },
  {
    // footer twenty-one
    id: 8727,
    free_shipping: true,
  },
  {
    // footer twenty-one for kiddyshop
    id: 9030,
    payment_hide: true,
  },
];

export const customizeHeader = [
  {
    // Fashion mart customization start
    id: 8203,
    mobile_font_big: "sm:text-xl text-sm",
    // Fashion mart customization end
  },
  // cloudhouse start
  {
    id: 8621,
    sidebar_cat_menu_design: "",
  },
  // cloudhouse end
];

export const customizeCheckout = [
  {
    id: 533,
    full_payment: "Full Payment",
    partial_payment: "Advanced Payment",
  },
  {
    id: 3020,
    Bkash_Payment: "Bkash Advance Payment",
  },
  {
    // checkout twenty-one (kiddy shop)
    id: 9030,
    cash_hide: "hidden",
    checked: true,
  },
  {
    // for watch-time-bd custom text show checkout 21, store id:10064
    id: 10064,
    customize_text_show_for_watchtime: (
      <p className="font-semibold">
        বি: দ্র: - অর্ডার করার পূর্বে পছন্দের পণ্যটি দেখে-জেনে-বুঝে মূল্য ও
        ডেলিভারি চার্জ নিশ্চিত হয়ে অর্ডারটি কনফার্ম করুন। অযথা হয়রানি করলে
        বিশেষ ব্যবস্থা নেওয়া হবে।
      </p>
    ),
  },
];

export const customizeSingleProductPage = [
  // for sparsebd.shop in single product page twenty-eight
  {
    id: 8927,
    class_name:
      "flex flex-col-reverse sm:flex-row-reverse mt-3 items-center gap-3",
    hidden: "hidden",
    heartbeat_animation: true,
    cart_btn2: true,
  },
  // for ucchas in single product page twenty-three
  {
    id: 9209,
    custom_text_show: true,
    order_korun_btn: true,
  },

  // for RBeli Fashion store id 8428
  {
    id: 8428,
    btn_design: true,
  },

  // for watch-time-bd review not show in details page 42, store id:10064
  {
    id: 10064,
    review_not_show: true,
    customize_text_show_for_watchtime_1: (
      <div>
        <p className="font-bold text-2xl my-2">কেন এখানে অর্ডার করবেন ?</p>
        <ul
          className="list-inside text-gray-500 font-bold pl-6"
          style={{ listStyleType: "disc" }}
        >
          <li className="py-1">বেস্ট প্রাইস</li>
          <li>বিক্রয় পরবর্তী সেবা</li>
          <li className="py-1">
            দ্রুত প্রোডাক্ট ডেলিভারি ও হাতে পেয়ে চেক করে টাকা প্রদান এর সুবিধা
          </li>
          <li>১০০% অরিজিনাল প্রোডাক্টের নিশ্চয়তা</li>
          <li className="py-1">ওয়াটার রেসিস্টান্স</li>
          <li>১ বছরের অফিসিয়াল মেশিন ওয়ারেন্টি</li>
          <li className="py-1">⁠সার্বক্ষণিক কাস্টমার সাপোর্ট</li>
        </ul>
      </div>
    ),
  },
  // for nexmanbd description not show in details page 34, store id:6433
  {
    id: 6433,
    description_not_show: true,
  },
  // for authenticdisposable.shop custom text show in details page 34, store id:10307
  {
    id: 10307,
    custom_text_for_authenticdisposable: "flavor:",
  },
];
export const customizeModalPopup = [
  // for mrchickenbd.com, modal will not open
  {
    id: 9208,
    modal_not_show: true,
  },
  {
    id: 9317 && 7948,
    modal_show: true,
  },
];

export const customizeMobileNavThree = [
  // for lotus bloem, category icon will not show
  {
    id: 9501,
    category_icon_not_show: true,
  },
];

export const customizeCards = [
  // for watch-time-bd rating not show in card 58, store id: 10064
  {
    id: 10064,
    rating_not_show: true,
  },
];
