import React, { useState } from "react";
import LockIcons from "../components/icons/LockIcons";
import EyeIcons from "../components/icons/EyeIcons";
import ClosedEyeICons from "../components/icons/ClosedEyeICons";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helpers/imageToBase64";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    profilePic: ""
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    let Image64 = "";

    if (file) {
      Image64 = await imageToBase64(file);
    }

    setData((prev) => ({
      ...prev,
      profilePic: Image64
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmpassword) {
      toast.error("Password and Confirm Password Must be Same", { position: "top-right" });
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/sign-up", {
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
        setData({
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
          profilePic: ""
        });
        navigate("/sign-in");
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
          <div className="sign-form-lock-container">
            {data.profilePic ? (
              <img src={data.profilePic} className="profile-pic" alt="Profile" />
            ) : (
              <div className="lock-icons">
                <LockIcons />
              </div>
            )}
            <form>
              <label htmlFor="upload-pic-input">
                <div className="upload-pic-text">Upload Pic</div>
                <input type="file" id="upload-pic-input" onChange={handleUploadFile} />
              </label>
            </form>
          </div>
        </div>
        <br></br>

        <form className="form" onSubmit={handlesubmit}>
          <div className="form-element">
            <div className="input-container">
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                placeholder="Name"
                onChange={handleOnChange}
              />
            </div>
          </div>

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
                placeholder="Password"
                onChange={handleOnChange}
              />
              <div className="icons-password" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeIcons /> : <ClosedEyeICons />}
              </div>
            </div>
          </div>

          <div className="form-element">
            <div className="input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={data.confirmpassword}
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirm Password"
                onChange={handleOnChange}
              />
              <div className="icons-password" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? <EyeIcons /> : <ClosedEyeICons />}
              </div>
            </div>
          </div>

          <div>
            <button className="btn-sign" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
        <p>
          Do you have an account?{" "}
          <Link to={"/sign-in"} className="newlink">
            Sign In
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
