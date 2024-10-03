import useTheme from "@/hooks/use-theme";
import moment from "moment";
import Countdown from "react-countdown";
import ProductCard from "./product-card";

const DateRange = ({ item }: any) => {
  const { design } = useTheme();

  const todayDate = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");
  const tomorrow_date = new Date(tomorrow).getTime();

  const start_date = new Date(item?.start_date).getTime();
  const end_date_time = new Date(item?.end_date).getTime();
  const today = new Date(todayDate).getTime();
  const end_date = new Date(item?.end_date).setHours(23, 59, 55);
  const current_time = moment().format("HH:mm");

  const start_time = item?.start_time;
  const end_time = item?.end_time?.split(":");

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <div className="text-3xl font-bold text-center">Time's up!</div>;
    } else {
      return (
        <div className="flex space-x-2 items-center w-full">
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
    <>
      {start_date <= Date.now() && Date.now() <= end_date && !start_time && (
        <>
          <div className="py-5 container">
            <div className="flex flex-wrap justify-between items-center sm:gap-4 shadow-lg py-3 px-2 sm:px-5">
              <h3 className="font-bold text-2xl font-sans my-2">
                {item?.name}
              </h3>
              <div className="flex flex-wrap sm:flex-nowrap  sm:justify-end items-center sm:space-x-2">
                <p className="text-xl font-semibold min-w-fit">End Time:</p>
                <Countdown date={end_date} renderer={renderer} />
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

      {start_date <= Date.now() &&
        Date.now() <= end_date &&
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
                      (new Date().setHours(end_time[0], end_time[1], 0, 0) -
                        Date.now())
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
      {start_date > Date.now() && !start_time && (
        <div className="py-5">
          <h1 className="text-3xl font-bold text-center mb-5">
            <span className="text-red-500">{item?.name}</span> Offer will be
            start from <span className="text-red-500">{item?.start_date}</span>
          </h1>
        </div>
      )}
      {start_date >= today && start_time && end_date_time < tomorrow_date && (
        <div>
          <h1 className="text-3xl font-bold text-center mb-5">
            <span className="text-red-500">{item?.name}</span> Offer will be
            start from <span className="text-red-500">{item?.start_date}</span>
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
      {start_date <= today &&
        end_date_time > today &&
        start_time &&
        (current_time >= item?.end_time || current_time < item?.start_time) && (
          <div className="py-5">
            <h1 className="text-3xl font-bold text-center mb-5">
              <span className="text-red-500">{item?.name}</span> Offer will be
              start from{" "}
              <span className="text-red-500">
                {start_date <= Date.now() &&
                current_time >= item?.end_time &&
                end_date_time >= tomorrow_date
                  ? moment().add(1, "day").format("YYYY-MM-DD")
                  : item?.start_date}
              </span>
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
    </>
  );
};

export default DateRange;
