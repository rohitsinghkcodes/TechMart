import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import UserMenu from "../../Components/Layouts/UserMenu";
import { useAuth } from "../../Context/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // get user data
  useEffect(() => {
    const { name, email, password, phone } = auth?.user;
    setName(name);
    setEmail(email);
    setPassword(password);
    setPhone(phone);
  }, [auth?.user]);

  // on submit form
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/auth//update-profile",
        { name, email, password, phone }
      );

      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        //update local storage
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(`${data?.msg}`);
      } else {
        // toast.error(res.data.msg);
        toast.error(`${data?.msg}`);
      }
    } catch (err) {
      console.log(err);
      // toast.error("Something went wrong!");
      toast.error(`Something went wrong, Please try again!`);
    }
  };

  return (
    <Layout title={"Dashboard - Profile"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card bg-dark  p-3 mx-2">
              <form onSubmit={onSubmitHandler}>
                <h1 className="mb-5 text-center">User Profile</h1>
                <div className="mb-2">
                  <label htmlFor="exampleInputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-dark form-control input-field"
                    id="exampleInputName"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="exampleInputEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-dark form-control input-field"
                    id="exampleInputEmail"
                    placeholder="Enter your email"
                    disabled
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="exampleInputPassword" className="form-label">
                    Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle password visibility
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-dark form-control input-field"
                      id="exampleInputPassword"
                      placeholder="Enter your password"
                    />
                    <span
                      className="eye-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <IoMdEyeOff
                          size="20px"
                          color="rgb(163, 161, 161)"
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      ) : (
                        <IoMdEye
                          size="20px"
                          color="rgb(163, 161, 161)"
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      )}
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPhone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-dark form-control input-field"
                    id="exampleInputPhone"
                    placeholder="Enter your phone no"
                  />
                </div>

                {/* <div className="mb-3">
                  <label htmlFor="exampleInputAnswer" className="form-label">
                    Security Question: Which is your favourite city?
                  </label>
                  <input
                    
                    type="text"
                    value={security_ans}
                    onChange={(e) => setSecurityAns(e.target.value)}
                    className="bg-dark form-control input-field"
                    id="exampleInputAnswer"
                    placeholder="Enter your security answer"
                  />
                </div> */}

                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>

                <p className="text-center text-light p-3 forgot-signin-signup">
                  Already got an account?
                  <Link to="/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
