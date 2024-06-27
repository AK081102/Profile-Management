import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode"; // Adjusted import statement

// ngpt
// import {jwtdecode} from "jwt-decode";


const UserProfile = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [prodata, setProData] = useState({
    age: "",
    gender: "",
    phoneno: "",
    dob: "",
    location: "",
    state: "",
    country: "",
    pincode: "",
    occupation: "",
    companyname: "",
    degree: "",
    dpt: "",
    twelthmark: "",
    tenthmark: "",
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profilePic: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkToken = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Decode JWT token to get user information
          //ngpt
          // const decodedToken = jwtdecode(token); // Decode JWT token to get user information

          setUserData({
            name: decodedToken.name,
            email: decodedToken.email,
            profilePic: decodedToken.profilePic,
          });
        } catch (error) {
          console.error("Token decoding error:", error);
          toast.error("Failed to load User Profile", { position: "top-right" });
          navigate("/sign-in"); // Redirect to sign-in if decoding fails
        }
      } else {
        navigate("/sign-in"); // Redirect to sign-in if no token is found
      }
    };

    checkToken(); // Call the function immediately to check token validity
  }, [token, navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user-profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        // setUserData(result.data); // Update state with fetched user data
        // ngpt 
        setProData(result.data);
        toast.success("User Profile Data Fetched Successfully", { position: "top-right" });
      }
      // else {
      //   const error = await response.json();
      //   throw new Error(error.message || "Failed to fetch user profile");
      // }
    } 
    catch (error) {
      console.log("fetching error");
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     fetchUserProfile(); // Fetch user profile data if token is valid
  //   }
  // }, [token]);

  //ngpt 
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateBlur = (e) => {
    const { name, value } = e.target;
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

    if (name === "dob" && !regex.test(value)) {
      toast.error("Invalid date format. Please use dd-mm-yyyy.", {
        position: "top-right",
      });
      setProData((prevData) => ({
        ...prevData,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (true) {
        setShowSuccessMessage(true);
        toast.success("Data Stored Successfully");
        setTimeout(() => {
            if (window.confirm("Now You Can Leave this Website Thank You !!!")) {
                navigate("/sign-in");
            }
        }, 400); // Delay of 100 milliseconds to ensure the toast is displayed first
    }
};


  const handleLogout = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <div className="container">
      <div className="card-from">
        <div className="card-header">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          {userData.profilePic ? (
            <img
              src={userData.profilePic}
              className="profile-pic"
              alt="Profile"
            />
          ) : (
            <div className="user-profile-icons">
              {/* Placeholder or icons for profile pic */}
              
            </div>
          )}
        </div>
        <br />

        <form className="form" onSubmit={handleSubmit}>
          <div className="title-text">
            <div className="title-login">Profile Details</div>
          </div>
          <h1 className="user-name">{userData.name}</h1>
          <p className="user-email">{userData.email}</p>

          {/* Example input elements */}
          <div className="form-element">
            <div className="input-container">
              <input
                type="number"
                id="age"
                name="age"
                value={prodata.age}
                placeholder="Age"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Example select for gender */}
          <div className="form-element">
      <div className="input-container">
        <select
          id="gender"
          name="gender"
          value={prodata.gender}
          onChange={handleInputChange}
          className={!prodata.gender ? 'placeholder' : ''}
        >
          <option value="" disabled hidden>
            Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
          {/* Example input for phone number */}
          <div className="form-element">
            <div className="input-container">
              <input
                type="tel"
                id="phoneno"
                name="phoneno"
                value={prodata.phoneno}
                placeholder="Phone Number"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Example input for date of birth */}
          <div className="form-element">
            <div className="input-container">
              <input
                type="text"
                id="dob"
                name="dob"
                value={prodata.dob}
                placeholder="Date of Birth"
                onChange={handleInputChange}
                onBlur={handleDateBlur}
                required
              />
            </div>
          </div>

          {/* Other form elements for location, state, country, etc. */}

          <div className="form-element">
            <div className="input-container">
              <input
                type="text"
                id="location"
                name="location"
                value={prodata.location}
                placeholder="Location"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-element">
            <div className="input-container">
              <input
                type="text"
                id="state"
                name="state"
                value={prodata.state}
                placeholder="State"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-element">
            <div className="input-container">
              <input
                type="text"
                id="country"
                name="country"
                value={prodata.country}
                placeholder="Country"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-element">
            <div className="input-container">
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={prodata.pincode}
                placeholder="Pincode"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-element">
            <div className="input-container">
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={prodata.occupation}
                placeholder="Occupation"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-element">
            <div className="input-container">
              <input
                type="text"
                id="companyname"
                name="companyname"
                value={prodata.companyname}
                placeholder="Company Name"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-element">
            <div className="input-container">
              <select
                id="degree"
                name="degree"
                value={prodata.degree}
                onChange={handleInputChange}
                className={!prodata.degree ? "placeholder" : ""}
                required
              >
                <option value="">Degree</option>
                <option value="be">B.E</option>
                <option value="btech">B.Tech </option>
                <option value="bsc">B.Sc</option>
                <option value="bca">BCA</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-element">
            <div className="input-container">
              <select
                id="dpt"
                name="dpt"
                value={prodata.dpt}
                onChange={handleInputChange}
                className={!prodata.dpt ? "placeholder" : ""}
                required
              >
                <option value="">Department</option>
                <option value="cse">CSE</option>
                <option value="it">IT</option>
                <option value="ece">ECE</option>
                <option value="eee">EEE</option>
                <option value="mech">Mech</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-element">
            <div className="input-container">
              <input
                type="number"
                id="twelthmark"
                name="twelthmark"
                value={prodata.twelthmark}
                placeholder="12th Mark"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-element">
            <div className="input-container">
              <input
                type="number"
                id="tenthmark"
                name="tenthmark"
                value={prodata.tenthmark}
                placeholder="10th Mark"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <button className="btn-sign" type="submit" onChange={()=> toast.success("Data Stored Successully")}>
              Register
            </button>
            
          </div>
        </form>
        {showSuccessMessage && 
        (
        <div className="success-message">
        </div>
      )}
    </div>
      
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
