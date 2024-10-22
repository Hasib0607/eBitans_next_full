"use client";

import Skeleton from "@/components/loader/skeleton";
import useTheme from "@/hooks/use-theme";
import axiosInstance from "@/utils/http/axios/axios-instance";
import { useEffect, useState } from "react";

const WithdrawHistoryPage = () => {
  const { store_id, store, headerSetting, userData } = useTheme();
  const user_id = userData?.affiliate_info?.user_id || null;
  const currency = userData?.affiliate_info?.currency || null;
  const phone = userData?.phone || null;
  const [loading, setLoading] = useState(true);
  const [withdrawHistoryData, setWithdrawHistoryData] = useState<any>(null);
  const [page, setPage] = useState<any>("1");
  const [pagination, setPagination] = useState<any>(1);

  useEffect(() => {
    if (user_id) {
      axiosInstance
        .post(`/customer-affiliate/withdraw-requests?page=${page}`, { user_id })
        .then((response) => {
          setWithdrawHistoryData(response?.data.data || {});
          setPagination(response?.data?.last_page || 1);
          setLoading(false);
        });
    }
  }, [user_id, page]);

  if (loading) {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <Skeleton />
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          {/* Table Head */}
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Amount</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Conditionally render table rows based on withdrawHistoryData */}
            {withdrawHistoryData && withdrawHistoryData?.length > 0 ? (
              withdrawHistoryData.map((item: any, index: any) => (
                <tr key={item?.id}>
                  <td className="py-2 px-4 border-b">
                    {item.amount} {item.currency_symbol}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {item.status === 0 ? (
                      <span className="inline-block bg-yellow-300 font-semibold px-2 rounded-full">
                        Pending
                      </span>
                    ) : item.status === 1 ? (
                      <span className="inline-block bg-green-400 font-semibold px-2 rounded-full">
                        Approved
                      </span>
                    ) : (
                      <span className="inline-block bg-red-400 font-semibold px-2 rounded-full">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-4 px-4 text-center" colSpan={4}>
                  No withdrawal history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-wrap justify-center">
        {Array.from({ length: pagination }).map((_, i: any) => (
          <span
            key={i}
            onClick={() => setPage(i)}
            className="px-3 py-2 bg-black w-5 h-6 mx-1.5 sm:mt-0 mt-3 rounded-full text-white cursor-pointer flex items-center justify-center"
          >
            {++i}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WithdrawHistoryPage;
