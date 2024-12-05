"use client";
import Skeleton from "@/components/loader/skeleton";
import useTheme from "@/hooks/use-theme";
import axiosInstance from "@/utils/http/axios/axios-instance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  const currency = userData?.affiliate_info?.currency || null;
  const phone = userData?.phone || null;
  const [loading, setLoading] = useState(true);
  const [affiliateInfo, setAffiliateInfo] = useState<AffiliateInfoType>({});
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [page, setPage] = useState<any>("1");
  const [pagination, setPagination] = useState<any>(1);
  const productListData = affiliateInfo?.productList?.data;

  const openModal = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const openWithdrawModal = () => {
    setWithdrawModalOpen(true);
  };

  const closeWithdrawModal = () => {
    setWithdrawModalOpen(false);
    setWithdrawAmount("");
  };

  const handleWithdrawSubmit = () => {
    const withdrawData = {
      user_id,
      phone,
      amount: withdrawAmount,
      currency: userData?.currency_id,
    };

    axiosInstance
      .post("/customer-affiliate/create/withdraw-requests", withdrawData)
      .then((response) => {
        if (response?.data?.status) {
          setAffiliateInfo((prevState) => ({
            ...prevState, // Copy the previous state
            withdrawPending: response?.data?.data, // Update only the withdrawPending property
          }));
          // Show success toast
          toast.success(
            response?.data?.message ||
              "Withdrawal request submitted successfully!"
          );
          // Close the modal after success
          closeWithdrawModal();
        } else {
          toast.error(
            response?.data?.message ||
              "Failed to submit the withdrawal request."
          );
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error?.response?.data?.message ||
            "An error occurred. Please try again later."
        );
      });
  };

  useEffect(() => {
    if (user_id) {
      axiosInstance
        .post(`/customer-affiliate/order-list?page=${page}`, { user_id })
        .then((response) => {
          setAffiliateInfo(response?.data?.data || {});
          setPagination(response?.data?.data?.productList?.last_page || 1);
          setLoading(false);
        });
    }
  }, [user_id, userData, page]);

  // if (loading) {
  //   return (
  //     <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
  //       <Skeleton />
  //     </div>
  //   );
  // }

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
              {affiliateInfo?.monthlyEarning} {currency}
            </p>
          </div>

          {/* Card 4: Total Earning */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-gray-700 font-semibold">Total Earning</h3>
            <p className="text-2xl font-bold mt-2">
              {affiliateInfo?.totalEarning} {currency}
            </p>
          </div>

          {/* Card 5: Your Balance (Red card) */}
          <div className="bg-red-500 shadow-lg rounded-lg px-5 py-3 text-center text-white relative col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="font-semibold">Your Balance</h3>
            <p className="text-2xl font-bold mt-2">
              {affiliateInfo.totalBalance} {currency}
            </p>
            {/* Conditional rendering based on withdrawPending */}
            {affiliateInfo.withdrawPending === false ? (
              // Show the "Withdraw" button when withdrawPending is false
              <button
                onClick={openWithdrawModal}
                className="mt-4 px-4 py-2 bg-yellow-400 text-red-500 font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-300"
              >
                Withdraw
              </button>
            ) : affiliateInfo.withdrawPending &&
              typeof affiliateInfo.withdrawPending === "object" ? (
              // Show the "Withdraw Processing" button when withdrawPending contains data
              <button
                className="mt-4 px-4 py-2 bg-gray-300 text-gray-600 font-semibold rounded-lg cursor-not-allowed text-[13px]"
                disabled
              >
                Withdraw Processing ({affiliateInfo?.withdrawPending?.amount}{" "}
                {currency})
              </button>
            ) : null}
          </div>
          {/* Withdraw Modal */}
          {withdrawModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-8 w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Withdraw Amount</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter amount"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={closeWithdrawModal}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleWithdrawSubmit}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
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
                <th className="py-2 px-4 border-b text-left">Product Name</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
                <th className="py-2 px-4 border-b text-left">Quantity</th>
                <th className="py-2 px-4 border-b text-left">Commision Rate</th>
                <th className="py-2 px-4 border-b text-left">
                  Commision Ammount
                </th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {productListData?.length > 0 && productListData?.map((productData: any, index: any) => (
                <tr key={productData.id} className="hover:bg-gray-50">
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
                  <td className="py-2 px-4 border-b">{productData?.amount}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => openModal(productData)}
                      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex flex-wrap justify-center">
            {Array.from({ length: pagination }).map((_, i: any) => (
              <span
                key={i}
                onClick={() => setPage(i)}
                className="px-3 py-2 bg-black w-5 h-6 mx-1.5 mt-3 rounded-full text-white cursor-pointer flex items-center justify-center"
              >
                {++i}
              </span>
            ))}
          </div>
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
                <strong>Contact:</strong>{" "}
                {selectedOrder?.order?.phone
                  ? selectedOrder?.order?.phone
                  : selectedOrder?.order?.email}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder?.order?.address}
              </p>
              <p>
                <strong>Amount:</strong> {selectedOrder?.order?.total}{" "}
                {selectedOrder?.currency}
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
