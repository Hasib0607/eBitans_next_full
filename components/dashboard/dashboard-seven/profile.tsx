"use client";
import useTheme from "@/hooks/use-theme";
import { profileImg } from "@/site-settings/siteUrl";
import httpReq from "@/utils/http/axios/http.service";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DataLoader from "@/components/loader/data-loader";

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { store_id } = useTheme();
  const [userDetails, setuserDetails] = useState<any>(null);
  const [call, setCall] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>();

  const { register, handleSubmit } = useForm({
    defaultValues: userDetails,
  });

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await httpReq.get("getuser");
      // set state with the result
      setuserDetails(data);
      setSelectedImage("");
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [call, store_id, user?.verify]);

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const update_profile = (res: any) => {
    // console.log(res, "res");
    httpReq
      .post("user/updateprofile", res)
      .then((res) => {
        setCall(!call);
        if (res.error) {
          toast(`${res.error}`, {
            type: "error",
            autoClose: 1000,
          });
        } else {
          toast("Profile updated successfully!", {
            type: "success",
            autoClose: 1000,
          });
        }
      })
      .catch((er) => {});
  };

  // useEffect(() => {
  //   return () => URL.revokeObjectURL(imageUrl);
  // }, [imageUrl]);
  // console.log(previewUrl,"imageUrl");

  const onSubmit = (data: any) => {
    //  console.log(data, "data");
    if (data?.name === "" || data?.email === "") {
      alert("Please fill up your input field ");
    } else {
      if (data?.image[0]) {
        if (data?.image[0].size > 2024000) {
          toast("Your Image very large more then 2MB!", {
            type: "warning",
          });
          return;
        }
        toBase64(data?.image[0]).then((res) => {
          update_profile({
            store_id,
            ...data,
            image: res,
          });
        });
      } else {
        update_profile({
          store_id,
          ...data,
        });
      }
    }
  };

  const imageChange = (e: any) => {
    // console.log(e, "e");
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="my-5 md:my-0">
        <div className="md:grid md:grid-cols-3 md:gap-5">
          <div className="md:col-span-3">
            <div className="">
              <h3 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
                Personal Information
              </h3>
              {/* <p className="text-base font-medium leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
            </div>
          </div>
          {userDetails ? (
            <div className="mt-5 md:mt-0 md:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 ">
                        <label className="block text-sm font-medium text-gray-700">
                          Photo
                        </label>
                        <div className="mt-1 flex items-center">
                          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            {user?.verify ? (
                              <img
                                src={
                                  selectedImage
                                    ? URL.createObjectURL(selectedImage)
                                    : userDetails?.image
                                    ? profileImg + userDetails?.image
                                    : "https://ebitans.com/Image/theme/default-user-image.png"
                                }
                                alt=""
                                className="object-fit"
                              />
                            ) : (
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            )}
                          </span>

                          <label
                            htmlFor="image"
                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none hover:ring-2 focus:ring-offset-2 hover:ring-indigo-500  lg:cursor-pointer"
                          >
                            <span>Change</span>
                            {/* <input onChange={imageChange} {...register("image")} id="image" name="image" type="file" className="" /> */}
                            <input
                              {...register("image")}
                              id="image"
                              name="image"
                              type="file"
                              className="form-control sr-only"
                              onChange={imageChange}
                              accept="image/*"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="col-span-6 ">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full name
                        </label>
                        <input
                          defaultValue={userDetails?.name}
                          {...register("name")}
                          type="text"
                          autoComplete="given-name"
                          className="mt-1 py-2 px-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </label>
                        {userDetails?.auth_type === "email" ? (
                          <input
                            type="email"
                            defaultValue={userDetails?.email}
                            autoComplete="email"
                            disabled={
                              userDetails?.auth_type === "email" ? true : false
                            }
                            className="mt-1 py-2 px-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                          />
                        ) : (
                          <input
                            {...register("email")}
                            type="email"
                            defaultValue={userDetails?.email}
                            autoComplete="email"
                            disabled={
                              userDetails?.auth_type === "email" ? true : false
                            }
                            className="mt-1 py-2 px-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                          />
                        )}
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mobile Number
                        </label>
                        {userDetails?.auth_type === "email" ? (
                          <input
                            {...register("phone")}
                            defaultValue={userDetails?.phone}
                            disabled={
                              userDetails?.auth_type === "email" ? false : true
                            }
                            type="number"
                            autoComplete="given-name"
                            className="mt-1 py-2 px-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                          />
                        ) : (
                          <input
                            defaultValue={userDetails?.phone}
                            disabled={
                              userDetails?.auth_type === "email" ? false : true
                            }
                            type="number"
                            autoComplete="given-name"
                            className="mt-1 py-2 px-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                          />
                        )}
                      </div>

                      <div className="col-span-6 ">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <div className="mt-1">
                          <textarea
                            defaultValue={userDetails?.address}
                            {...register("address")}
                            rows={3}
                            className="mt-1 py-2 px-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                            placeholder="Your Address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <DataLoader />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
