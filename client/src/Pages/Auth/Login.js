import { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../../styles/authStyles.css";
import { useAuth } from "../../Context/authContext.js";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";

const Login = () => {
  // hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  // SUBMIT BUTTON HIT HANDLER
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login/", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(`${res.data.msg}`);

        // before navigating, add user data to auth
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        // store auth details in local_storage
        localStorage.setItem("auth", JSON.stringify(res.data));

        // navigate to homepage
        navigate(location.state || "/");
      } else {
        toast.error(`${res.data.msg}`);
      }
    } catch (err) {
      console.log(err);
      toast.error(`Something went wrong, Please try again!`);
    }
  };

  return (
    <Layout title="Login | E-Commerce App">
      <div className="form-container">
        <form onSubmit={onSubmitHandler}>
          <h1 className="mb-5 text-center">Sign In</h1>

          <div className="mb-2">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-dark form-control input-field"
              id="exampleInputEmail"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="exampleInputPassword" className="form-label">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                required
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
                    style={{ justifyContent: "center", alignItems: "center" }}
                  />
                ) : (
                  <IoMdEye
                    size="20px"
                    color="rgb(163, 161, 161)"
                    style={{ justifyContent: "center", alignItems: "center" }}
                  />
                )}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
          <p className="text-center text-light p-3 forgot-signin-signup">
            <Link to="/forgot-password">Forgot Password?</Link> |
            <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
