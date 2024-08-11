"use client";
import { useCallback, useEffect, useState } from "react";
// import { token } from "../services/AxiosInstance";
// import { isMobile, isTablet, isBrowser } from "react-device-detect";
import axios from "axios";
import httpReq from "@/utils/http/axios/http.service";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localstorage";
// import httpReq from "../services/http.service";
// import {
//   getFromLocalStorage,
//   saveToLocalStorage,
// } from "../services/utils/localStorage";

// if (typeof window !== "undefined") {
// let token = JSON.parse(localStorage.getItem("persist:root")!)?.auth
//   ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")!)?.auth)?.user
//       ?.token
//   : null;
// }

// console.log(token, "token");

// let v: any = "";

// if (typeof window !== "undefined") {
// let v = JSON.parse(localStorage.getItem("persist:root")!)?.auth
//   ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")!)?.auth)?.user
//       ?.verify
//   : null;
// }

// console.log(v, "v");

// export const v = JSON.parse(localStorage.getItem("persist:root")!)?.auth
//   ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")!)?.auth)?.user
//   : null;

const useData = () => {
  const [layout, setLayout] = useState([]);
  const [design, setDesign] = useState<any>(null);
  const [headerSetting, setHeaderSetting] = useState<any>({});
  const [menu, setMenu] = useState([]);
  const [page, setPage] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [slider, setSlider] = useState([]);
  const [product, setProduct] = useState([]);
  const [productByFirstCategory, setProductByFirstCategory] = useState([]);
  const [feature_product, set_feature_product] = useState([]);
  const [best_sell_product, set_best_sell_product] = useState([]);
  const [banner, setBanner] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [store_id, setStore_id] = useState(null);
  const [userData, setUser] = useState(null);
  const [offer, setOffer] = useState([]);
  const [campaign, setCampaign] = useState([]);
  const [loading, setLoading] = useState("idle");
  const [store, setStore] = useState({});
  const [brand, setBrand] = useState([]);
  const [darktheme, setDarktheme] = useState(false);
  const [device, setDevice] = useState("");
  const [address, setAddress] = useState("");
  const [ip, setIP] = useState("");
  const [city, setCity] = useState("");
  const [country_code, setCountry_code] = useState("");
  const [country_name, setCountry_name] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [postal, setPostal] = useState("");
  const [state, setState] = useState("");
  const [browser, setBrowser] = useState("Unknown");
  const [os, setOs] = useState(null);
  const [mobileOs, setMobileOs] = useState(null);
  const [bangla, setLanguage] = useState(true);
  const [social, setSocial] = useState(null);
  const [module, setModule] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const [pseCat, setPseCat] = useState("");
  const [searchPse, setSearchPse] = useState("");
  const [designData, setDesignData] = useState<any>(null);

  const [token, setToken] = useState("");
  const [v, setV] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("persist:root")) {
        const auth = JSON.parse(localStorage.getItem("persist:root")!)?.auth;

        if (auth) {
          const user = JSON.parse(
            JSON.parse(localStorage.getItem("persist:root")!)?.auth
          )?.user;

          setV(user?.verify);
        }
      }

      setToken(
        JSON.parse(localStorage.getItem("persist:root")!)?.auth
          ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")!)?.auth)
              ?.user?.token
          : null
      );
    }
  }, [store_id]);

  useEffect(() => {
    const designDataColor = {
      header_color: design?.header_color,
      text_color: design?.text_color,
      logo: headerSetting?.logo,
      website_name: headerSetting?.website_name,
    };

    if (design) {
      saveToLocalStorage("design", designDataColor);
    }
    const userData = getFromLocalStorage("design");
    if (userData) {
      setDesignData(userData);
    }
  }, [design, headerSetting]);

  const header_color = designData?.header_color || design?.header_color;
  const text_color = designData?.text_color || design?.text_color;
  const logo = designData?.logo || headerSetting?.logo;
  const website_name = designData?.website_name || headerSetting?.website_name;

  // const webAnalytics = module?.find(item => item?.modulus_id === 3)
  // booiking api

  useEffect(() => {
    async function fetchBookingData() {
      try {
        const data = await axios.post(
          "https://admin.ebitans.com/api/v1/booking-from",
          { store_id: store_id, modulus_id: 108 }
        );
        setBookingData(data?.data);
      } catch (error) {
        // setError(error)
        console.log(error, "error");
      }
    }
    if (store_id) {
      fetchBookingData();
    }
  }, [store_id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await httpReq.post("modules", { store_id: store_id });

        setSocial(data?.data?.QuickLogin);
        setModule(data?.data?.modules);

        const webAnalytics = data?.data?.modules?.find(
          (item: any) => item?.modulus_id === 3
        );

        if (webAnalytics?.status === "1") {
          navigator.geolocation.getCurrentPosition((position) => {
            fetchAddress(position.coords.latitude, position.coords.longitude);
          });
        }

        if (webAnalytics?.status === "1") {
          await fetchAddress(0, 0);
        }
        if (webAnalytics?.status === "1") {
          await getData();
        }
      } catch (error) {
        // setError(error)
        console.log(error, "error");
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store_id]);

  // geo location
  const fetchAddress = async (lat: any, lng: any) => {
    if (lat) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${
          lat ? lat : latitude
        }&lon=${lng ? lng : longitude}`
      );
      const data = await response.json();
      setAddress(data.display_name);
    }
  };

  // get ip address
  const getData = async () => {
    const res = await axios.get("https://ipapi.co/json/");
    setIP(res.data.ip);
    setState(res?.data?.region);
    setPostal(res?.data?.postal);
    setLatitude(res?.data?.latitude);
    setLongitude(res?.data?.longitude);
    setCountry_name(res?.data?.country_name);
    setCountry_code(res?.data?.country_code);
    setCity(res?.data?.city);
  };

  // user info
  // const url = window.location.href;
  // let timeSpentScrolling = 0;
  // let isHalted = false;
  // let haltedStartTime, haltedEndTime;
  // let totalHaltedTime = 0;

  // const update_halt_state = () => {
  //   if (isHalted) {
  //     isHalted = false;
  //     haltedEndTime = new Date().getTime();
  //     totalHaltedTime += (haltedEndTime - haltedStartTime) / 1000;
  //   } else {
  //     isHalted = true;
  //     haltedStartTime = new Date().getTime();
  //   }
  // };

  // Listen for scroll events
  // window.addEventListener("scroll", () => {
  //   timeSpentScrolling += 1.8;

  //   update_halt_state();
  // });

  // document.addEventListener("DOMContentLoaded", () => {
  //   const start = new Date().getTime();

  //   // AVERAGE SCROLLING INTERVAL - 39 seconds
  //   setInterval(() => {
  //     if (new Date().getTime() - start > 39000) {
  //       update_halt_state();
  //     }
  //   }, 39000);

  //   window.addEventListener("beforeunload", () => {
  //     const end = new Date().getTime();

  //     update_halt_state();

  //     const totalTime =
  //       (end - start) / 1000 - timeSpentScrolling / 1000 - totalHaltedTime;
  //     // console.log(totalTime, "totalTime");
  //     navigator.sendBeacon(
  //       `https://admin.ebitans.com/api/v1/ebi-analytics/store?store_id=${store_id}&user_id=${
  //         userData ? userData?.id : null
  //       }&device=${device}&ip=${ip}&mac=${"c5-65-89-45"}&url=${url}&city=${city}&country_code=${country_code}&country_name=${country_name}&latitude=${latitude}&longitude=${longitude}&postal=${postal}&state=${state}&location=${address}&page_title=${"Time"}&category_id=${""}&product_id=${""}&browser=${browser}&os=${
  //         mobileOs === "Unknown" ? os : mobileOs
  //       }&isTime=${totalTime}`
  //     );
  //   });
  // });

  // browser detect and os detect
  // useEffect(() => {
  //   const platform = navigator.platform;

  //   // browser detect
  //   if (
  //     navigator.userAgent.indexOf("Opera") !== -1 ||
  //     navigator.userAgent.indexOf("OPR") !== -1
  //   ) {
  //     setBrowser("Opera");
  //   } else if (
  //     navigator.userAgent.indexOf("Safari") !== -1 &&
  //     navigator.userAgent.indexOf("Chrome") === -1
  //   ) {
  //     setBrowser("Safari");
  //   } else if (navigator.userAgent.indexOf("Edg") !== -1) {
  //     setBrowser("Microsoft Edge");
  //   } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
  //     setBrowser("Chrome");
  //   } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
  //     setBrowser("Firefox");
  //   } else if (navigator.userAgent.indexOf("Brave") !== -1) {
  //     setBrowser("Brave");
  //   } else {
  //     setBrowser("Unknown");
  //   }

  //   // os detect
  //   const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  //   let MobileOs = "Unknown";
  //   if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i))
  //     MobileOs = "iOS";
  //   if (userAgent.match(/Android/i)) MobileOs = "Android";
  //   setMobileOs(MobileOs);

  //   let os = "Unknown";
  //   if (platform.indexOf("Win") !== -1) os = "Windows";
  //   if (platform.indexOf("Mac") !== -1) os = "MacOS";
  //   if (platform.indexOf("Linux") !== -1) os = "Linux";
  //   setOs(os);
  // }, [mobileOs]);

  // device detect
  // useEffect(() => {
  //   if (isMobile) {
  //     setDevice("Mobile");
  //   }
  //   if (isTablet) {
  //     setDevice("Tablet");
  //   }
  //   if (isBrowser) {
  //     setDevice("Desktop");
  //   }
  //   //passing getData method to the lifecycle method
  // }, []);

  // const darkThemeColor = {
  //   backgroundColor: "rgb(51 65 85)",
  //   textColor: "white",
  // };

  // main home page api
  const fetchHeader = useCallback(
    async (data: any) => {
      const res = await axios.post(
        "https://admin.ebitans.com/api/v1/" + "getsubdomain/name",
        { name: window.location.host }
      );

      const {
        store,
        store_id,
        menu,
        headersetting,
        category,
        subcategory,
        slider,
        product,
        feature_product,
        best_sell_product,
        banner,
        testimonials,
        design,
        layout,
        page,
        offer,
        campaign,
        brand,
        productByFirstCategory,
      } = res?.data;

      if (token && v) {
        const user = await httpReq.get("getuser");

        setUser(user);
      }

      // set state with the result
      setHeaderSetting(headersetting);
      setMenu(menu);
      setPage(page);
      setCategory(category);
      setSubcategory(subcategory);
      setSlider(slider);
      setProduct(product);
      set_feature_product(feature_product);
      set_best_sell_product(best_sell_product);
      setBanner(banner);
      setTestimonials(testimonials);
      setStore_id(store_id);
      setDesign(design);
      setLayout(layout);
      setOffer(offer);
      setCampaign(campaign);
      setStore(store);
      setBrand(brand);
      setProductByFirstCategory(productByFirstCategory);
    },
    [token, v]
  );

  useEffect(() => {
    const domain = window.location.host;
    const data = { name: domain };
    // call the function
    fetchHeader(data)
      // make sure to catch any error
      .catch(console.error);
  }, [fetchHeader]);

  const makeid = (length: any) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return {
    userData,
    makeid,
    setLoading,
    loading,
    store_id,
    layout,
    design,
    headerSetting,
    menu,
    page,
    category,
    subcategory,
    slider,
    product,
    feature_product,
    best_sell_product,
    banner,
    offer,
    campaign,
    testimonials,
    darktheme,
    // darkThemeColor,
    setDarktheme,
    store,
    brand,
    ip,
    device,
    address,
    postal,
    longitude,
    latitude,
    city,
    state,
    country_name,
    country_code,
    mobileOs,
    os,
    browser,
    bangla,
    setLanguage,
    social,
    module,
    productByFirstCategory,
    orderPlaced,
    setOrderPlaced,
    bookingData,
    pseCat,
    setPseCat,
    setSearchPse,
    searchPse,
    header_color,
    website_name,
    logo,
    text_color,
  };
};
export default useData;
