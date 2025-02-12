import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { _BASE_URL } from "../utils/constent";

const EditProfile = () => {
  const ageRef = useRef();
  const genderRef = useRef();
  const photoURLRef = useRef();
  const bioRef = useRef();
  const skillRef = useRef();

  const dispatcher = useDispatch();
  const user = useSelector((state) => state.user.user);

  // patch api call here

  const handelProfileEdit = async (e) => {
    e.preventDefault();

    const pathcData = {
      age: 29,
      gender: genderRef.current.value,
      skills: skillRef.current.value,
      photoURL: photoURLRef.current.value,
      bio: bioRef.current.value,
    };

    try {
      const response = await axios.patch(
       _BASE_URL+"/api/v1/profile/update",
        pathcData,
        { withCredentials: true }
      );

      console.log(response.data);

      if (response.state === 200) {
        dispatcher(addUser(response.data));
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <>
      <div>Edit Your Profile</div>
      {user && (
        <form
          onSubmit={handelProfileEdit}
          className="max-w-md mx-auto p-2 bg-white shadow-md rounded-lg space-y-2 "
        >
          <div className="flex space-x-3">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder={user.firstName}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder={user.lastName}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="emailId"
              placeholder={user.emailId}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700">Age</label>
            <input
              ref={ageRef}
              type="number"
              name="age"
              placeholder={user.age}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              ref={genderRef}
              name="gender"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="others">others</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Photo URL</label>
            <input
              ref={photoURLRef}
              name="photoURL"
              placeholder={user.photoURL}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Bio</label>
            <textarea
              ref={bioRef}
              name="bio"
              placeholder={user.bio}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700">Skills</label>
            <input
              ref={skillRef}
              name="skills"
              placeholder={user.skills}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default EditProfile;
