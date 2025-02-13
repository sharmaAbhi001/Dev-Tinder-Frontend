import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { _BASE_URL } from "../utils/constent";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  const newPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${_BASE_URL}/api/v1/password-reset/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate("/login");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-700 flex items-center justify-center h-screen">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-white text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={newPasswordSubmit}>
          <label className="block font-medium text-white text-xl mb-2">
            Enter your new password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none mb-4"
            type="password"
            placeholder="New Password"
            required
          />
          <button
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

