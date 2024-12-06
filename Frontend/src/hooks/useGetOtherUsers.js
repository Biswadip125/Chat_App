import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_API_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOtherUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_API_URL}/users`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        dispatch(setOtherUsers(res.data));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOtherUsers();
  }, []);

  return { loading };
};

export default useGetOtherUsers;
