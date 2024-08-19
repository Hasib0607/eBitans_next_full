export const handleLogout = () => {
  if (window !== undefined) {
    window.localStorage.removeItem("persist:root");
    window.location.href = "/";
  }
};
