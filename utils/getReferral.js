const getReferral = (itemID) => {
    try {
      const checkItem = localStorage.getItem('referralObj');
      if (checkItem) {
        // Try to parse the JSON string from localStorage
        const referralObj = JSON.parse(checkItem);
  
        // Return the referral code for the given itemID if it exists
        return referralObj[itemID] || null;
      }
    } catch (error) {
      console.error("Error parsing referralObj from localStorage:", error);
      // Return an empty string or a default value in case of an error
      return '';
    }
  
    // Default return if no referralObj exists in localStorage
    return '';
  };
  
  export default getReferral;
  