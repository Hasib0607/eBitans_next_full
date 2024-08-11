export const handleLogout = () => {
  if (window !== undefined) {
    window.localStorage.removeItem("persist:root");
    console.log("Item removed from localStorage");
    window.location.href = "/";
  }
};
