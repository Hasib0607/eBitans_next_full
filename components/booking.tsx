import React from "react";
import useTheme from "@/hooks/use-theme";

const Booking = ({ setFormBookData, formBookData }: any) => {
  const { bookingData } = useTheme();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormBookData({
      ...formBookData,
      [name]: value,
    });
  };

  return (
    <form className="flex flex-col gap-3 max-w-[500px] min-w-[300px] mx-auto">
      <h1 className="text-center text-2xl">Booking Information</h1>
      {bookingData?.data?.map((item: any) => (
        <div className="flex flex-col" key={item?.id}>
          {item?.field_name === "name" && (
            <div className="flex flex-col ">
              <label>
                {item?.c_name}{" "}
                <span className="text-red-500">
                  {item?.requirement_status === "required" && "*"}
                </span>
              </label>
              <input
                required={item?.requirement_status === "required" && true}
                type="text"
                name="name"
                value={formBookData.name}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
              />
            </div>
          )}
          {item?.field_name === "phone" && (
            <div className="flex flex-col ">
              <label>
                {item?.c_name}{" "}
                <span className="text-red-500">
                  {item?.requirement_status === "required" && "*"}
                </span>
              </label>
              <div className="flex items-center w-full">
                <p className="border-y border-l py-2 border-gray-400 rounded-l-md px-2 bg-gray-400">
                  +88
                </p>
                <input
                  required={item?.requirement_status === "required" && true}
                  maxLength={11}
                  minLength={11}
                  type="tel"
                  name="phone"
                  value={formBookData.phone}
                  onChange={handleChange}
                  className="focus:outline-none focus:ring-0 focus:border-gray-400 border-l-0 border border-gray-400 rounded-r-md w-full"
                />
              </div>
            </div>
          )}
          {item?.field_name === "email" && (
            <div className="flex flex-col ">
              <label>
                {item?.c_name}{" "}
                <span className="text-red-500">
                  {item?.requirement_status === "required" && "*"}
                </span>
              </label>
              <input
                required={item?.requirement_status === "required" && true}
                type="email"
                name="email"
                value={formBookData.email}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
              />
            </div>
          )}
          {item?.field_name === "date" && (
            <div className="flex flex-col ">
              <label>
                {item?.c_name}{" "}
                <span className="text-red-500">
                  {item?.requirement_status === "required" && "*"}
                </span>
              </label>
              <input
                required={item?.requirement_status === "required" && true}
                type="date"
                name="specificDate"
                value={formBookData.specificDate}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
              />
            </div>
          )}
          {item?.field_name === "date range" && (
            <div>
              <h1>{item?.c_name}</h1>
              <div className="flex justify-between flex-wrap gap-3 mt-3">
                <div className="flex flex-col ">
                  <label>
                    Start Date{" "}
                    <span className="text-red-500">
                      {item?.requirement_status === "required" && "*"}
                    </span>
                  </label>
                  <input
                    required={item?.requirement_status === "required" && true}
                    type="date"
                    name="startDate"
                    value={formBookData.startDate}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
                  />
                </div>
                <div className="flex flex-col ">
                  <label>
                    End Date{" "}
                    <span className="text-red-500">
                      {item?.requirement_status === "required" && "*"}
                    </span>
                  </label>
                  <input
                    required={item?.requirement_status === "required" && true}
                    type="date"
                    name="endDate"
                    value={formBookData.endDate}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          )}
          {item?.field_name === "location range" && (
            <div>
              <h1>{item?.c_name}</h1>
              <div className="flex justify-between flex-wrap gap-3 mt-3">
                <div className="flex flex-col ">
                  <label>
                    Pickup Location{" "}
                    <span className="text-red-500">
                      {item?.requirement_status === "required" && "*"}
                    </span>
                  </label>
                  <input
                    required={item?.requirement_status === "required" && true}
                    type="text"
                    name="pickupLocation"
                    value={formBookData.pickupLocation}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
                  />
                </div>
                <div className="flex flex-col ">
                  <label>
                    Drop Location{" "}
                    <span className="text-red-500">
                      {item?.requirement_status === "required" && "*"}
                    </span>
                  </label>
                  <input
                    required={item?.requirement_status === "required" && true}
                    type="text"
                    name="dropLocation"
                    value={formBookData.dropLocation}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          )}
          {item?.field_name === "time" && (
            <div className="flex flex-col mt-3">
              <label>
                {item?.c_name}{" "}
                <span className="text-red-500">
                  {item?.requirement_status === "required" && "*"}
                </span>
              </label>
              <input
                required={item?.requirement_status === "required" && true}
                type="time"
                name="time"
                value={formBookData.time}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
              />
            </div>
          )}
          {item?.field_name === "comment" && (
            <div className="flex flex-col ">
              <label>
                {item?.c_name}{" "}
                <span className="text-red-500">
                  {item?.requirement_status === "required" && "*"}
                </span>
              </label>
              <textarea
                required={item?.requirement_status === "required" && true}
                name="comment"
                value={formBookData.comment}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0 focus:border-gray-400 border border-gray-400 rounded-md text-sm"
              />
            </div>
          )}
        </div>
      ))}
    </form>
  );
};

export default Booking;
