import axios from "axios";

const Announcement = async ({ design, url }: any) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "get-announcement",
    {
      name: url,
    }
  );

  const anArry = res.data.data || {};
  const alternatedArry = [];
  for (let i = 0; i < anArry.length * 4; i++) {
    alternatedArry.push(anArry[i % anArry.length]);
  }

  return (
    <div id="annoucement" style={{ background: design?.header_color }}>
      <div className="relative flex overflow-x-hidden container">
        <div className="py-2 animate-marquee whitespace-nowrap">
          {alternatedArry.map((an: any, index: number) => (
            <span
              style={{ color: design?.text_color }}
              key={index}
              className="text-xl mx-4"
            >
              {an.announcement}
            </span>
          ))}
        </div>

        <div
          style={{ background: design?.header_color }}
          className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap"
        >
          {alternatedArry.map((an: any, index: number) => (
            <span
              style={{ color: design?.text_color }}
              key={index}
              className="text-xl mx-4"
            >
              {an.announcement}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
