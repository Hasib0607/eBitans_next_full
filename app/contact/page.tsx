import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const ContactPage = () => {
  const bangla = false;

  return (
    <div>
      <hr className="lg:mt-5" />
      <section className="lg:px-20 bg-emerald-50">
        <div className="container px-6 py-12 mx-auto">
          <div>
            <p className="font-medium text-blue-500 text-3xl dark:text-blue-400">
              𝙲𝚘𝚗𝚝𝚊𝚌𝚝 𝚞𝚜
            </p>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              {bangla
                ? "আমাদের বন্ধুত্বপূর্ণ দল আপনার সাথে কথা বলতে ভালোবাসবে।"
                : "Our friendly team would love to hear from you."}
            </p>
            <hr className="w-[20%]" />
            <div className="flex divide-x space-x-4">
              <button
                aria-label={
                  bangla ? "Facebook দিয়ে লগইন করুন" : "Log in with Facebook"
                }
                className="p-3 rounded-sm"
              >
                <FaFacebookF className="w-5 h-5 fill-current" />
              </button>
              <button
                aria-label={
                  bangla ? "YouTube দিয়ে লগইন করুন" : "Log in with YouTube"
                }
                className="p-3 rounded-sm"
              >
                <FaYoutube className="w-5 h-5 fill-current" />
              </button>
              <button
                aria-label={
                  bangla ? "Instagram দিয়ে লগইন করুন" : "Log in with Instagram"
                }
                className="p-3 rounded-sm"
              >
                <FaInstagram className="w-5 h-5 fill-current" />
              </button>
              <button
                aria-label={
                  bangla ? "LinkedIn দিয়ে লগইন করুন" : "Log in with LinkedIn"
                }
                className="p-3 rounded-sm"
              >
                <FaLinkedinIn className="w-5 h-5 fill-current" />
              </button>
            </div>
            <hr className="w-[20%]" />
          </div>

          <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
              <div className="flex divide-x-2">
                <div>
                  <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </span>
                  <h2 className="mt-4 text-base font-medium text-gray-800">
                    {bangla ? "ইমেইল" : "Email"}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {bangla
                      ? "আমাদের বন্ধুত্বপূর্ণ দল সাহায্য করার জন্য এখানে আছে।"
                      : "Our friendly team is here to help."}
                  </p>
                  <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                    info@ebitans.com <br />
                    assist@ebitans.com
                  </p>
                </div>

                <div>
                  <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </span>
                  <h2 className="mt-4 text-base font-medium text-gray-800">
                    {bangla ? "অফিস" : "Office"}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {bangla
                      ? "আমাদের অফিসে এসে হ্যালো বলুন।"
                      : "Come say hello at our office HQ."}
                  </p>
                  <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                    4th Floor, House: 39, Road: 20, Nikunja 2, Dhaka-1229
                  </p>
                </div>
              </div>

              <div>
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </span>
                <h2 className="mt-4 text-base font-medium text-gray-800">
                  {bangla ? "ফোন" : "Phone"}
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  {bangla
                    ? "শনিবার থেকে বৃহস্পতিবার সকাল ৯টা থেকে সন্ধ্যা ৬টা পর্যন্ত।"
                    : "Sat-Thus from 9am to 6pm."}
                </p>
                <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                  +88 01886 515579
                  <br />
                  +88 01886 515578
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                title="map"
                marginHeight={0}
                marginWidth={0}
                scrolling="no"
                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
