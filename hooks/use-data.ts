"use client";
import { useCallback, useEffect, useState } from "react";
import httpReq from "@/utils/http/axios/http.service";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localstorage";
import axios from "axios";

const useData = () => {
  const [design, setDesign] = useState<any>(null);
  const [headerSetting, setHeaderSetting] = useState<any>({});
  const [menu, setMenu] = useState([]);
  const [page, setPage] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [slider, setSlider] = useState([]);
  const [productByFirstCategory, setProductByFirstCategory] = useState([]);
  const [banner, setBanner] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [store_id, setStore_id] = useState(null);
  const [userData, setUser] = useState(null);
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
          process.env.NEXT_PUBLIC_API_URL + "booking-from",
          { store_id: store_id, modulus_id: 108 }
        );
        setBookingData(data?.data);
      } catch (error) {
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
        // console.log(error, "error");
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

  //check here
  const fetchHeader = useCallback(
    async (data: any) => {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "getsubdomain/data",
        data
      );
      const {
        store,
        store_id,
        menu,
        headersetting,
        category,
        subcategory,
        slider,
        // product,
        // feature_product,
        // best_sell_product,
        banner,
        testimonials,
        design,
        layout,
        page,
        // offer,
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
      setBanner(banner);
      setTestimonials(testimonials);
      setStore_id(store_id);
      setDesign(design);
      setCampaign(campaign);
      setStore(store);
      setBrand(brand);
      setProductByFirstCategory(productByFirstCategory);
    },
    [token, v]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const domain = window.location.host.startsWith("www.")
        ? window.location.host.slice(4)
        : window.location.host;

      const data = { name: domain };
      // call the function
      if (domain != "") {
        fetchHeader(data).catch(console.error);
      } else {
        window.location.reload();
      }
    }
  }, []);

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
    design,
    headerSetting,
    menu,
    page,
    category,
    subcategory,
    slider,
    banner,
    campaign,
    testimonials,
    darktheme,
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
