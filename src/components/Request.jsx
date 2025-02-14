import { useEffect, useState } from "react";
import axios from "axios";
import Simmer from "./Simmer";
import RequestCard from "./RequestCard";
import { _BASE_URL } from "../utils/constent";

const Request = () => {
  const [pendingRequest, setPendingRequest] = useState([]);

  const fetchPendingRequest = async () => {
    try {
      const response = await axios.get(
        _BASE_URL+"/api/v1/user/request/received",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setPendingRequest(response?.data?.intrestedUser);
      }
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    fetchPendingRequest();
  }, []);
  if (!pendingRequest || pendingRequest.length === 0) {
    return <Simmer />;
  }
  return (
    <div>
      {pendingRequest.map((data) => (
        <RequestCard data={data}  pendingRequest={pendingRequest} setPendingRequest={setPendingRequest} key={data._id} />
      ))}
    </div>
  );
};

export default Request;
