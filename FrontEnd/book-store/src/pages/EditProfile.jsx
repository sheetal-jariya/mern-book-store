import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data);
      } catch (err) {
        toast.error("❌ Failed to load profile");
        console.error(err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("http://localhost:8080/api/editprofile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("✅ Profile updated!");
      navigate("/profile");
    } catch (err) {
      toast.error("❌ Update failed!");
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-14 px-8 py-10 bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] ring-1 ring-orange-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">👤 Edit Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-orange-300"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email (read-only)</label>
          <input
            value={user.email}
            disabled
            className="w-full border bg-gray-100 border-gray-300 rounded-md px-3 py-2 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Mobile</label>
          <input
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-orange-300"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Address</label>
          <input
            name="address"
            value={user.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-orange-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
