import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import UserMenu from "../../Components/Layouts/UserMenu";
import { useAuth } from "../../Context/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdEdit } from "react-icons/md";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("********");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  // get user data
  useEffect(() => {
    console.log("#############");
    console.log(auth.user);
    const { name, email, password, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPassword(password);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  // on submit form
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/auth//update-profile",
        { name, email, password, phone, address }
      );

      if (data?.success) {
        console.log("#############");
        console.log(auth);
        setAuth({ ...auth, user: data?.updatedUser });
        //update local storage
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(`${data?.msg}`);
        setEditName(false);
        setEditPassword(false);
        setEditPhone(false);
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
      <div className="container container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card bg-dark d-flex rounded-5 p-5 ">
              <form onSubmit={onSubmitHandler}>
                <h1 className="mb-5 text-center">User Profile</h1>
                <div className="mb-2">
                  <label htmlFor="exampleInputName" className="form-label ms-2">
                    Name
                    <span
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Edit"
                      data-tooltip-place="right"
                    >
                      &ensp; &ensp;
                      <MdEdit
                        className="justify-content-space-between"
                        onClick={() => setEditName(true)}
                      />
                    </span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={
                      !editName
                        ? " bg-dark form-control input-field2"
                        : "bg-dark form-control input-field"
                    }
                    id="exampleInputName"
                    placeholder="Enter your name"
                    disabled={!editName}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="exampleInputEmail"
                    className="form-label ms-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-dark form-control input-field2"
                    id="exampleInputEmail"
                    placeholder="Enter your email"
                    disabled
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="exampleInputPassword"
                    className="form-label ms-2"
                  >
                    Password
                    <span
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Edit"
                      data-tooltip-place="right"
                    >
                      &ensp; &ensp;
                      <MdEdit onClick={() => setEditPassword(true)} />
                    </span>
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword && editPassword ? "text" : "password"} // Toggle password visibility
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={
                        !editPassword
                          ? " bg-dark form-control input-field2"
                          : "bg-dark form-control input-field"
                      }
                      id="exampleInputPassword"
                      placeholder="Enter your password"
                      disabled={!editPassword}
                    />
                    <span
                      className="eye-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword && editPassword ? (
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

                <div className="mb-2">
                  <label htmlFor="exampleInputName" className="form-label ms-2">
                    Address
                    <span
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Edit"
                      data-tooltip-place="right"
                    >
                      &ensp; &ensp;
                      <MdEdit
                        className="justify-content-space-between"
                        onClick={() => setEditAddress(true)}
                      />
                    </span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={
                      !editAddress
                        ? " bg-dark form-control input-field2"
                        : "bg-dark form-control input-field"
                    }
                    id="exampleInputName"
                    placeholder="Enter your address"
                    disabled={!editAddress}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleInputPhone"
                    className="form-label ms-2"
                  >
                    Phone
                    <span
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Edit"
                      data-tooltip-place="right"
                    >
                      &ensp;&ensp;
                      <MdEdit onClick={() => setEditPhone(true)} />
                    </span>
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={
                      !editPhone
                        ? " bg-dark form-control input-field2"
                        : "bg-dark form-control input-field"
                    }
                    id="exampleInputPhone"
                    placeholder="Enter your phone no"
                    disabled={!editPhone}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-danger rounded-4 px-2 mt-2"
                  disabled={
                    !(editName || editPassword || editPhone || editAddress)
                  }
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
