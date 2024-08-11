import httpReq from "@/utils/http/axios/http.service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const cancelAlert = (id: any, user: any, setCall: any) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result:any) => {
    if (result.isConfirmed) {
      httpReq
        .post("order/cancel", { id, user_id: user?.details?.id })
        .then((res) => {
          if (res?.success) {
            setCall((prevCall: any) => !prevCall); // Toggle call state to trigger useEffect
            toast(res?.success, {
              type: "success",
            });
            Swal.fire({
              title: "Deleted!",
              text: "Your order has been cancelled.",
              icon: "success",
            });
          } else {
            toast("Failed to cancel the order", {
              type: "error",
            });
            Swal.fire({
              title: "Failed!",
              text: "Your order could not be cancelled.",
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast("An error occurred", {
            type: "error",
          });
          Swal.fire({
            title: "Error!",
            text: "An error occurred while cancelling the order.",
            icon: "error",
          });
        });
    }
  });
};
