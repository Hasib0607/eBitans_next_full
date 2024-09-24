import axios from "axios";
import Marquee from "react-fast-marquee";

const Announcement = async ({ design, url }: any) => {
  let anArray = [];
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "get-announcement",
      {
        name: url,
      }
    );
    if (res.data && res.data.data) {
      anArray = res.data.data;
    }
  } catch (error) {
    console.error("Error fetching announcements:", error);
  }

  const alternatedArray = [];
  for (let i = 0; i < anArray.length * 4; i++) {
    alternatedArray.push(anArray[i % anArray.length]);
  }

  return (
    <div id="annoucement" style={{ background: design?.header_color }}>
      <div className="relative flex overflow-x-hidden container">
        <Marquee speed={10} pauseOnHover={true}>
          <div className="py-2  whitespace-nowrap">
            {alternatedArray.map((an: any, index: number) => (
              <span
                style={{ color: design?.text_color }}
                key={index}
                className="text-[9px] md:text-xl mx-4"
              >
                {an.announcement}
              </span>
            ))}
          </div>
        </Marquee>
        {/* <Marquee speed={10}>
          <div
            style={{ background: design?.header_color }}
            className="absolute top-0 py-2  whitespace-nowrap"
          >
            {alternatedArray.map((an: any, index: number) => (
              <span
                style={{ color: design?.text_color }}
                key={index}
                className="text-[10px] md:text-xl mx-4"
              >
                {an.announcement}
              </span>
            ))}
          </div>
        </Marquee> */}
      </div>
    </div>
  );
};

export default Announcement;
