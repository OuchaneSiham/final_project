import { API_BASE_URL } from "../../config";
import { socket } from "../../socket";

const useLogout = (navigate) => {
  return async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API_BASE_URL}/users/logout`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      });
    } catch (err) {
      console.error("HTTP logout failed", err);
    }
    if (socket) {
      socket.disconnect();
    }
    localStorage.removeItem("token");
    navigate("/");
  };
};
export default useLogout;