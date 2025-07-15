import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios.get("http://localhost:8080/api/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.data.success) setUser(res.data.data);
        else navigate("/login");
      })
      .catch(err => {
        console.error("Error:", err);
        navigate("/login");
      });
  }, [navigate]);

  if (!user) return <p className="text-center mt-10 text-gray-500">🔄 Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-14 bg-white px-8 py-10 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)] ring-1 ring-orange-200">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => navigate("/editprofile")}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg shadow"
        >
          ✏️ Edit
        </button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-orange-100 text-orange-600 flex items-center justify-center rounded-full text-3xl font-bold shadow-inner">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-500">📚 Book Lover</p>
      </div>

      <div className="space-y-4 text-gray-700 text-sm">
        <p className="flex items-center gap-2"><span className="text-gray-400">📧</span><span className="font-medium">Email:</span> {user.email}</p>
        <p className="flex items-center gap-2"><span className="text-gray-400">📱</span><span className="font-medium">Mobile:</span> {user.mobile}</p>
        <p className="flex items-center gap-2"><span className="text-gray-400">🏠</span><span className="font-medium">Address:</span> {user.address}</p>
      </div>
    </div>
  );
};

export default Profile;

