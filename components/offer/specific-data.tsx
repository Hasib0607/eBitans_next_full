import useTheme from "@/hooks/use-theme";
import moment from "moment";
import Countdown from "react-countdown";
import ProductCard from "./product-card";

const SpecificDate = ({ item }: any) => {
  const { design } = useTheme();

  const start_time = item?.start_time;

  // console.log(start_time,"start_time");

  const offerday = moment(item?.specific_dates).format("L");
  // console.log(offerday,"offerday");

  const today = moment().format("L");
  const current_time = moment().format("HH:mm");

  const e = item?.end_time?.split(":");

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <div className="text-3xl font-bold text-center">Time's up!</div>;
    } else {
      // Render a countdown
      return (
        <div className="flex space-x-2 items-center">
          {days ? (
            <>
              <span
                className="sm:font-semibold  sm:text-lg text-center min-w-16 w-full  min-w-fit sm:h-10  sm:py-1 sm:px-2 rounded"
                style={{
                  backgroundColor: design?.header_color,
                  color: design?.text_color,
                }}
              >
                {"Days: " + days}
              </span>{" "}
              <span>:</span>
            </>
          ) : null}
          <span
            className="sm:font-semibold  sm:text-lg text-center min-w-16 w-full  min-w-fit sm:h-10  sm:py-1 sm:px-2 rounded"
            style={{
              backgroundColor: design?.header_color,
              color: design?.text_color,
            }}
          >
            {"H: " + hours}
          </span>{" "}
          <span>:</span>
          <span
            className="sm:font-semibold  sm:text-lg text-center min-w-16 w-full  min-w-fit sm:h-10  sm:py-1 sm:px-2 rounded"
            style={{
              backgroundColor: design?.header_color,
              color: design?.text_color,
            }}
          >
            {"M: " + minutes}
          </span>
          <span>:</span>
          <span
            className="sm:font-semibold  sm:text-lg text-center min-w-16 w-full  min-w-fit sm:h-10  sm:py-1 sm:px-2 rounded"
            style={{
              backgroundColor: design?.header_color,
              color: design?.text_color,
            }}
          >
            {"Sec: " + seconds}
          </span>
        </div>
      );
    }
  };

  return (
    <div>
      {today === offerday &&
        current_time < item?.end_time &&
        current_time >= item?.start_time && (
          <>
            <div className="py-5 container">
              <div className="flex flex-wrap justify-between items-center sm:gap-4 shadow-lg py-3 px-2 sm:px-5">
                <h3 className="font-bold text-2xl font-sans my-2">
                  {item?.name}
                </h3>
                <div className="flex flex-wrap sm:flex-nowrap  sm:justify-end items-center sm:space-x-2">
                  <p className="text-xl font-semibold min-w-fit">End Time:</p>
                  <Countdown
                    date={
                      Date.now() +
                      (new Date().setHours(e[0], e[1], 0, 0) - Date.now())
                    }
                    renderer={renderer}
                  />
                </div>
              </div>
            </div>

            <div className="sm:shadow-lg py-5 pb-16 sm:my-10 sm:rounded-md ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {item?.campaignProducts?.map((product: any) => (
                  <ProductCard key={product?.id} item={product} />
                ))}
              </div>
            </div>
          </>
        )}

      {today === offerday && !item?.end_time && (
        <>
          {" "}
          <div className="py-5 container">
            <div className="flex flex-wrap justify-between items-center  shadow-lg py-3 px-5">
              <h3 className="font-bold text-2xl font-sans my-2">
                {item?.name}
              </h3>
              <div className="flex justify-end items-center space-x-2">
                <p className="text-xl font-semibold">End Time:</p>
                <Countdown
                  date={
                    Date.now() +
                    (new Date().setHours(23, 59, 0, 0) - Date.now())
                  }
                  renderer={renderer}
                />
              </div>
            </div>
          </div>
          <div className="sm:shadow-lg py-5 pb-16 sm:my-10 sm:rounded-md ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {item?.campaignProducts?.map((product: any) => (
                <ProductCard key={product?.id} item={product} />
              ))}
            </div>
          </div>
        </>
      )}

      {offerday > today && !start_time && (
        <div className="py-5">
          <h1 className="text-3xl font-bold text-center mb-5">
            <span className="text-red-500">{item?.name}</span> Offer will be
            start from{" "}
            <span className="text-red-500">{item?.specific_dates}</span>
          </h1>
        </div>
      )}
      {offerday >= today && start_time && current_time < item?.start_time && (
        <div className="py-5">
          <h1 className="text-3xl font-bold text-center mb-5">
            <span className="text-red-500">{item?.name}</span> Offer will be
            start from{" "}
            <span className="text-red-500">{item?.specific_dates}</span>
            <span>
              {" "}
              Start Time:{" "}
              <span className="text-red-500">
                {moment(start_time, "HH:mm").format("h:mm a")}
              </span>
            </span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default SpecificDate;
