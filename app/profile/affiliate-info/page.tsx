"use client";
import Skeleton from "@/components/loader/skeleton";
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
  productList?: any;
  minWithdrawAmount?: any;
}

const AffiliateInfo = () => {
  const { store_id, store, headerSetting, userData } = useTheme();
  const user_id = userData?.affiliate_info?.user_id || null;
  const [loading, setLoading] = useState(true);
  const [affiliateInfo, setAffiliateInfo] = useState<AffiliateInfoType>({});
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(affiliateInfo);
  // console.log(affiliateInfo.productList.data);
  const productListData = affiliateInfo?.productList?.data;
  // console.log(productListData);

  const openModal = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  }

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
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <Skeleton />
      </div>
    );
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
            Minimum {affiliateInfo?.minWithdrawAmount} TK balance to Withdraw!
          </p>
        </div>
        {/* Table */}
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">#</th>
                <th className="py-2 px-4 border-b text-left">Product Name</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
                <th className="py-2 px-4 border-b text-left">Quantity</th>
                <th className="py-2 px-4 border-b text-left">Commision Rate</th>
                <th className="py-2 px-4 border-b text-left">Commision Ammount</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {productListData.map((productData: any, index: any) => (
                <tr key={productData.id} className="hover:bg-gray-50">
                  <th className="py-2 px-4 border-b">{index + 1}</th>
                  <td className="py-2 px-4 border-b">
                    {productData?.product?.name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {productData?.product?.regular_price}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {productData?.product?.quantity}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {productData?.commission_percent}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {productData?.amount}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => openModal(productData)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Order Information</h2>
              <p>
                <strong>Order ID:</strong> {selectedOrder?.order?.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedOrder?.order?.name}
              </p>
              <p>
                <strong>Contact:</strong> {(selectedOrder?.order?.phone) ? selectedOrder?.order?.phone : selectedOrder?.order?.email}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder?.order?.address}
              </p>
              <p>
                <strong>Amount:</strong> {selectedOrder?.order?.total} {selectedOrder?.currency}
              </p>
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliateInfo;
