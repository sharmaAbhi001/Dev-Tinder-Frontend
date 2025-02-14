import axios from "axios";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { _BASE_URL } from "../utils/constent";


const EditProfile = () => {
  const dispatcher = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [error,setError]=useState("")

  // State variables for form fields
  const [formData, setFormData] = useState({
    age: user?.age || "",
    gender: user?.gender || "",
    photoURL: user?.photoURL || "",
    bio: user?.bio || "",
    skills: user?.skills || "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // API call for updating profile
  const handleProfileEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        _BASE_URL + "/api/v1/profile/update",
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatcher(addUser(response.data));
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <>
      {user && (
        <form
          onSubmit={handleProfileEdit}
          className="max-w-md mx-auto p-2 bg-white shadow-md rounded-lg space-y-2"
        >
          <div className="flex space-x-3">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="emailId"
              value={user.emailId}
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
          {error}
        </form>
      )}
    </>
  );
};

export default EditProfile;