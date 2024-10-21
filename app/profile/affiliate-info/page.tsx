"use client";
import useTheme from "@/hooks/use-theme";
import axiosInstance from "@/utils/http/axios/axios-instance";
import { useEffect, useState } from "react";

// Define the structure of affiliateInfo
interface AffiliateInfoType {
  totalCustomer?: number;
  monthlyCustomer?: number;
  monthlyEarning?: string;
  totalEarning?: string;
  totalBalance?: string;
  withdrawPending?: any;
}

const AffiliateInfo = () => {
  const { store_id, store, headerSetting, userData } = useTheme();
  const user_id = userData?.affiliate_info?.user_id || null;
  const [loading, setLoading] = useState(true);
  const [affiliateInfo, setAffiliateInfo] = useState<AffiliateInfoType>({});
  console.log(affiliateInfo);
  console.log(affiliateInfo.withdrawPending);

  useEffect(() => {
    if (user_id) {
      axiosInstance
        .post("/customer-affiliate/order-list", { user_id })
        .then((response) => {
          setAffiliateInfo(response?.data?.data || {});
          setLoading(false);
        });
    }
  }, [user_id, userData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Card 1: Total Customer */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-gray-700 font-semibold">Total Customer</h3>
            <p className="text-2xl font-bold mt-2">
              {affiliateInfo?.totalCustomer}
            </p>
          </div>

          {/* Card 2: Monthly Customer */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-gray-700 font-semibold">Monthly Customer</h3>
            <p className="text-2xl font-bold mt-2">
              {affiliateInfo?.monthlyCustomer}
            </p>
          </div>

          {/* Card 3: Monthly Earning */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-gray-700 font-semibold">Monthly Earning</h3>
            <p className="text-2xl font-bold mt-2">
              {affiliateInfo?.monthlyEarning} TK
            </p>
          </div>

          {/* Card 4: Total Earning */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-gray-700 font-semibold">Total Earning</h3>
            <p className="text-2xl font-bold mt-2">
              {affiliateInfo?.totalEarning} TK
            </p>
          </div>

          {/* Card 5: Your Balance (Red card) */}
          <div className="bg-red-500 shadow-lg rounded-lg px-5 py-3 text-center text-white relative col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="font-semibold">Your Balance</h3>
            <p className="text-2xl font-bold mt-2">
              {affiliateInfo.totalBalance} TK
            </p>
            {/* Conditional rendering based on withdrawPending */}
            {affiliateInfo.withdrawPending == false ? (
              // Button shown when withdrawPending is true
              <button className="mt-4 px-4 py-2 bg-yellow-400 text-red-500 font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-300">
                Withdraw
              </button>
            ) : (
              // Button shown when withdrawPending is false
              <button
                className="mt-4 px-4 py-2 bg-gray-300 text-gray-600 font-semibold rounded-lg cursor-not-allowed"
                disabled
              >
                Withdraw Processing ({affiliateInfo?.withdrawPending?.amount})
              </button>
            )}
          </div>
        </div>
        {/* Text below the red box */}
        <div className="text-right mt-4">
          <p className="text-xs text-red-500">
            Minimum 500 TK balance to Withdraw!
          </p>
        </div>
        {/* Table */}
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">#</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Job</th>
                <th className="py-2 px-4 border-b text-left">Favorite Color</th>
                <th className="py-2 px-4 border-b text-left">Action</th>{" "}
                {/* Added Action Column */}
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="hover:bg-gray-50">
                <th className="py-2 px-4 border-b">1</th>
                <td className="py-2 px-4 border-b">Cy Ganderton</td>
                <td className="py-2 px-4 border-b">
                  Quality Control Specialist
                </td>
                <td className="py-2 px-4 border-b">Blue</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out">
                    View
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-gray-50">
                <th className="py-2 px-4 border-b">2</th>
                <td className="py-2 px-4 border-b">Hart Hagerty</td>
                <td className="py-2 px-4 border-b">
                  Desktop Support Technician
                </td>
                <td className="py-2 px-4 border-b">Purple</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out">
                    View
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-gray-50">
                <th className="py-2 px-4 border-b">3</th>
                <td className="py-2 px-4 border-b">Brice Swyre</td>
                <td className="py-2 px-4 border-b">Tax Accountant</td>
                <td className="py-2 px-4 border-b">Red</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out">
                    View
                  </button>
                </td>
              </tr>
              {/* Additional Rows */}
              {/* Row 4 */}
              <tr className="hover:bg-gray-50">
                <th className="py-2 px-4 border-b">4</th>
                <td className="py-2 px-4 border-b">Althea E. Morrison</td>
                <td className="py-2 px-4 border-b">Web Developer</td>
                <td className="py-2 px-4 border-b">Green</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out">
                    View
                  </button>
                </td>
              </tr>
              {/* Row 5 */}
              <tr className="hover:bg-gray-50">
                <th className="py-2 px-4 border-b">5</th>
                <td className="py-2 px-4 border-b">Thomas Al Carter</td>
                <td className="py-2 px-4 border-b">Graphic Designer</td>
                <td className="py-2 px-4 border-b">Yellow</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AffiliateInfo;
