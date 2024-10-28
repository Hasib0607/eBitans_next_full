import axios from "axios";

const getReferralCode = async () => {
  try {
    const token = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).auth
    ).user.token;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}getuser`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Access the referral code from the response data
    const referralCode = response?.data?.affiliate_info?.referral_code;
    return referralCode;
  } catch (error) {
    console.error(error, "inside getUser.js");
  }
};

export default getReferralCode;
