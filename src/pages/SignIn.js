import React, { useState } from "react";
import LockIcons from "../components/icons/LockIcons";
import EyeIcons from "../components/icons/EyeIcons";
import ClosedEyeICons from "../components/icons/ClosedEyeICons";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataResponse = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success(dataResponse.message, { position: "top-right" });
        localStorage.setItem("token", dataResponse.token);
        navigate("/user-profile"); // Ensure this path matches your routing configuration
      } else {
        toast.error(dataResponse.message, { position: "top-right" });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);  // Log the error for debugging
      toast.error("Failed to fetch. Please check your server and network.", { position: "top-right" });
    }
  };

  return (
    <div className="h-screen-center">
      <div className="card-from">
        <div className="card-header">
          <div className="lock-icons">
            <LockIcons />
          </div>
        </div>

        <form className="form" onSubmit={handlesubmit}>
          <div className="form-element">
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                placeholder="Email"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="form-element">
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={data.password}
                id="password"
                name="password"
                onChange={handleOnChange}
                placeholder="Password"
              />
              <div
                className="icons-password"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeIcons /> : <ClosedEyeICons />}
              </div>
            </div>
          </div>
          <div>
            <button className="btn-sign" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </form>
        <p>
          Don't have an account? <Link to={"/sign-up"} className="newlink"> Sign Up </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
