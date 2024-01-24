import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import { useAuth } from "../../Context/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff, IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { PinList } from "../../Helpers/PinList";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("********");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [addLine, setAddLine] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editAddress2, setEditAddress2] = useState(false);

  // get user data
  useEffect(() => {
    const { name, email, password, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPassword(password);
    setPhone(phone);
    setAddress(address);
    setAddLine(address.substring(0, address.length - 13));
    setPin(address.substring(address.length - 6));
  }, [auth?.user]);

  // on submit form
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (editPassword) {
        if (!(password === confirmPassword)) {
          toast.error(" Password fields do not match!");
          return;
        }
      }

      const { data } = await axios.put(
        "http://localhost:8080/api/v1/auth//update-profile",
        { name, email, password, phone, address }
      );

      if (data?.success) {
        setPassword("********");
        setConfirmPassword("");
        setAuth({ ...auth, user: data?.updatedUser });
        //update local storage
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(`${data?.msg}`, {
          style: {
            width: "350px", // Set the desired width
          },
        });
        setEditName(false);
        setEditPassword(false);
        setEditPhone(false);
        setEditAddress2(false);
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

  // check pin availability
  const availableDelivery = () => {
    if (!PinList.includes(pin)) {
      toast.error(
        `Sorry, We do not deliver at ${pin}!\nCheck your Pincode again!`,
        {
          style: {
            width: "350px", // Set the desired width
          },
        }
      );
      return;
    }

    setAddress(`${addLine}\n PIN: ${pin}`);
    setEditAddress(false);
    toast.info("Plase click update profile to confirm changes.", {
      autoClose: 2000,
    });
  };

  return (
    <Layout title={"Dashboard - Profile"}>
      <div className="form-container">
        {(editName || editPassword || editPhone || editAddress2) && (
          <div className="alert alert-warning py-2" role="alert">
            💡 Changes made in profile details, Please click on "Update Profile"
            to confirm changes!
          </div>
        )}
        <div>
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
              <label htmlFor="exampleInputEmail" className="form-label ms-2">
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
            {/* Password Field */}
            <div className="mb-2">
              <label htmlFor="exampleInputPassword" className="form-label ms-2">
                Password
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Edit"
                  data-tooltip-place="right"
                >
                  &ensp; &ensp;
                  <MdEdit
                    onClick={() => {
                      setPassword("");
                      setEditPassword(true);
                    }}
                  />
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
                  placeholder="Type new password"
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
            {/* Confirm Password Field */}
            {editPassword && (
              <div className="mb-2">
                <label
                  htmlFor="exampleInputPassword"
                  className="form-label ms-2"
                >
                  Confirm Password
                  <span
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Close"
                    data-tooltip-place="right"
                  >
                    &ensp; &ensp;
                    <IoMdClose onClick={() => setEditPassword(false)} />
                  </span>
                </label>
                <div className="password-input-wrapper">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-dark form-control input-field"
                    id="exampleInputPassword"
                    placeholder="Type password again"
                  />
                </div>
              </div>
            )}
            {/* ADDRESS ANNDEDDDIADDRESS */}
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
                    onClick={() => {
                      setEditAddress(true);
                      setEditAddress2(true);
                    }}
                  />
                </span>
              </label>

              {editAddress ? (
                <div className="card rounded-4 pt-2 px-4 bg-dark mt-1">
                  <div className="row ">
                    <div className="col-md-2 text-light m-0">
                      <p6 className="ms-3">Line 1</p6>
                    </div>
                    <div className="col-md-10 m-0">
                      <textarea
                        type="text"
                        value={addLine}
                        onChange={(e) => setAddLine(e.target.value)}
                        className={
                          !editAddress
                            ? " bg-dark form-control input-field2"
                            : "bg-dark form-control input-field"
                        }
                        id="exampleInputName"
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2 text-light m-0">
                      <p2 className="ms-3">PIN</p2>
                    </div>
                    <div className="col-6 m-0">
                      <input
                        type="text"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className={
                          !editAddress
                            ? " bg-dark form-control input-field2"
                            : "bg-dark form-control input-field"
                        }
                        id="exampleInputName"
                        placeholder="enter pincode"
                        disabled={!editAddress}
                      />
                    </div>
                    <div className="col-4  ">
                      <div
                        onClick={availableDelivery}
                        className="btn btn-sm btn-warning rounded-2 border-0 px-3"
                      >
                        Set Address
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <textarea
                    type="text"
                    value={address}
                    className={
                      !editAddress
                        ? " bg-dark form-control input-field2"
                        : "bg-dark form-control input-field"
                    }
                    id="exampleInputName"
                    style={{ height: "6rem" }}
                    placeholder="Enter your address"
                    disabled
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPhone" className="form-label ms-2">
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
              className="btn btn-danger btn-sm rounded-3 px-3 mt-2"
              disabled={
                !(editName || editPassword || editPhone || editAddress2)
              }
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
