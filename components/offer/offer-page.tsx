"use client";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Skeleton from "../loader/skeleton";
import DateRange from "./date-range";
import GetProductByProductId from "./get-prod-by-prodid";
import SpecificDate from "./specific-data";

const OfferPage = () => {
  const {
    design,
    address,
    ip,
    device,
    store_id,
    userData,
    postal,
    longitude,
    latitude,
    city,
    state,
    country_name,
    country_code,
    offer,
    browser,
    os,
    mobileOs,
  } = useTheme();

  const [campaign, setCampaign] = useState([]);
  const [load, setLoad] = useState(false);

  // user info
  const url = window.location.href;
  useEffect(() => {
    async function fetchData() {
      try {
        await httpReq.post(
          `ebi-analytics/store?store_id=${store_id}&user_id=${
            userData ? userData?.id : null
          }&device=${device}&ip=${ip}&mac=${"c5-65-89-45"}&url=${url}&city=${city}&country_code=${country_code}&country_name=${country_name}&latitude=${latitude}&longitude=${longitude}&postal=${postal}&state=${state}&location=${address}&page_title=${"Offer Page"}&category_id=${""}&product_id=${""}&browser=${browser}&os=${
            mobileOs === "Unknown" ? os : mobileOs
          }`
        );
      } catch (error) {
        console.log(error, "error");
      }
    }
    if (ip) {
      fetchData();
    }
  }, [
    store_id,
    address,
    state,
    postal,
    longitude,
    latitude,
    country_name,
    country_code,
    city,
    url,
    ip,
    device,
    userData,
    browser,
    os,
    mobileOs,
  ]);

  useEffect(() => {
    // setLoad(true)
    fetchCampaignData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCampaignData = async () => {
    // get the data from the api
    const { yourData, status } = await httpReq.post(`campaign`, {
      store_id: store_id,
    });

    if (status === "200") {
      setCampaign(yourData?.campaign);
      setLoad(false);
    } else {
      setLoad(false);
    }
  };

  const start_date = new Date(offer?.start_date).getTime();
  const end_date = new Date(offer?.end_date).setHours(23, 59, 59);

  const sDate: any = campaign?.map((item: any) => item?.start_date);
  const eDate: any = campaign?.map((item: any) => item?.end_date);

  console.log(campaign, "campaign");

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
                className="sm:font-semibold sm:text-lg text-center min-w-16 w-full  min-w-fit sm:h-10  sm:py-1 sm:px-4 px-4 rounded"
                style={{
                  backgroundColor: design?.header_color,
                  color: design?.text_color,
                }}
              >
                {" "}
                {"Days : " + days}
              </span>{" "}
              <span>:</span>
            </>
          ) : null}
          <span
            className="sm:font-semibold  sm:text-lg text-center min-w-16 w-full  min-w-fit sm:h-10  sm:py-1 sm:px-2 px-4 rounded"
            style={{
              backgroundColor: design?.header_color,
              color: design?.text_color,
            }}
          >
            {hours}
          </span>{" "}
          <span>:</span>
          <span
            className="sm:font-semibold  sm:text-lg text-center min-w-16 w-full  min-w-fit sm:h-10  sm:py-1 sm:px-2 px-4 rounded"
            style={{
              backgroundColor: design?.header_color,
              color: design?.text_color,
            }}
          >
            {minutes}
          </span>
          <span>:</span>
          <span
            className="sm:font-semibold  sm:text-lg text-center min-w-16 w-full  min-w-fit sm:h-10  sm:py-1 sm:px-2 px-4 rounded"
            style={{
              backgroundColor: design?.header_color,
              color: design?.text_color,
            }}
          >
            {seconds}
          </span>
        </div>
      );
    }
  };

  return (
    <>
      {load ? (
        <>
          <Skeleton />
        </>
      ) : (
        <div className="sm:container px-5 sm:py-10 py-5 mt-20">
          {(start_date >= Date.now() ||
            end_date <= Date.now() ||
            offer?.length === 0 ||
            offer?.products?.length === 0) &&
          (sDate >= Date.now() ||
            eDate <= Date.now() ||
            campaign?.length === 0) ? (
            <>
              <div className="font-semibold">
                <div className="flex justify-center  items-center text-xl ">
                  Offer Not Available Data
                </div>
              </div>
            </>
          ) : (
            <>
              {start_date <= Date.now() &&
                Date.now() <= end_date &&
                offer?.products?.length !== 0 && (
                  <div>
                    <div className="py-5">
                      <div className="flex flex-wrap justify-between items-center sm:gap-4 shadow-lg py-3">
                        <h3 className="font-bold text-2xl font-sans my-2">
                          {offer?.name}
                        </h3>
                        <div className="flex flex-wrap sm:flex-nowrap  sm:justify-end items-center sm:space-x-2 ">
                          <p className="text-xl font-semibold min-w-fit">
                            End Time :{" "}
                          </p>
                          <Countdown
                            date={Date.now() + (end_date - Date.now())}
                            renderer={renderer}
                          />
                        </div>
                      </div>
                    </div>
                    <GetProductByProductId offerProducts={offer?.products} />
                  </div>
                )}
            </>
          )}
          <CampainPage campaign={campaign} />
        </div>
      )}
    </>
  );
};

export default OfferPage;

const CampainPage = ({ campaign }: any) => {
  return (
    <>
      <div>
        {campaign?.map((item: any, id: any) => (
          <GetComponent key={id} component={item?.length_type} item={item} />
        ))}
      </div>
    </>
  );
};

const GetComponent = ({ component, item }: any) => {
  switch (component) {
    case "date_range":
      return <DateRange item={item} />;
    case "specific_date":
      return <SpecificDate item={item} />;
    default:
      return null;
  }
};
