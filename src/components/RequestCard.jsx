import axios from "axios";
import { _BASE_URL } from "../utils/constent";

const RequestCard = ({ data, setPendingRequest }) => {
  const { _id } = data;
  const { firstName, lastName, photoURL, skills, bio, age, gender } = data.fromUserId;

  const handelAcceptClick = async () => {
    try {
      const response = await axios.post(
        `${_BASE_URL}/api/v1/request/review/accepted/${_id}`,
        {},
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert(`You accepted ${firstName}. Now you are friends.`);
        setPendingRequest((prev) => prev.filter((v) => v._id !== _id)); // ✅ Correct usage
      }
    } catch (error) {
      alert(error.response?.data || "Something went wrong");
      console.error(error);
    }
  };

  const handelRejectClick = async () => {
    try {
      const response = await axios.post(
        `${_BASE_URL}/api/v1/request/review/rejected/${_id}`,
        {},
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert(`You rejected ${firstName}`);
        setPendingRequest((prev) => prev.filter((v) => v._id !== _id)); // ✅ Correct usage
      }
    } catch (error) {
      alert(error.response?.data || "Something went wrong");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="card h-auto md:h-64 md:flex-row bg-base-100 shadow-xl w-full max-w-3xl mx-auto my-2">
        <figure className="w-full md:w-2/6 flex justify-center">
          <img src={photoURL} alt="Profile" className="object-cover w-full h-52 md:h-auto" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{skills}</p>
          <p>{bio}</p>
          <p>{age}</p>
          <p>{gender}</p>
          <div className="card-actions space-x-6 justify-end">
            <button onClick={handelAcceptClick} className="btn btn-secondary">
              Accept
            </button>
            <button onClick={handelRejectClick} className="btn bg-red-500 hover:bg-red-600 text-white">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
