import  { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css"; // Import CSS for this form
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, mobile, address } = formData;
    console.log(formData, "====formData")
    if (!name || !email || !password || !mobile || !address) {
      return setMessage("All fields are required.");
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8080/api/register", formData);
      navigation('/login')
      setMessage("Registration successful!");
      setFormData({ name: "", email: "", password: "", mobile: "", address: "" });
    } catch (err) {
      console.log(err, "---errorrororo")
      setMessage("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Register</h2>
        {message && <div className="message">{message}</div>}
        {["name", "email", "password", "mobile", "address"].map((field) => (
          <div key={field} className="form-group">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
