import { useState, React } from "react";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/authStyles.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [security_ans, setSecurityAns] = useState("");

  //SUBMIT BUTTOM HIT HANDLER
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password/",
        {
          email,
          newPassword,
          security_ans,
        }
      );

      if (res.data.success) {
        // toast.success(res.data.msg);
        alert(`✅ ${res.data.msg} ✅`);

        //navigate to homepage
        navigate("/login");
      } else {
        // toast.error(res.data.msg);
        alert(`❌ ${res.data.msg}`);
      }
    } catch (err) {
      console.log(err);
      // toast.error("Something went wrong!");
      alert(`🚫 Something went wrong, Please try again! 🚫`);
    }
  };

  return (
    <Layout title="Forgot Password | E-Commerce App">
      <div className="form-container">
        <form onSubmit={onSubmitHandler}>
          <h1 className="mb-5 text-center">Reset Password</h1>

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
            <label htmlFor="exampleInputSecAns" className="form-label">
              Security Question: Which is your favourite city?
            </label>
            <input
              required
              type="text"
              value={security_ans}
              onChange={(e) => setSecurityAns(e.target.value)}
              className="bg-dark form-control input-field"
              id="exampleInputSecAns"
              placeholder="Enter your security answer"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="exampleInputPassword" className="form-label">
              New Password
            </label>
            <input
              required
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-dark form-control input-field"
              id="exampleInputPassword"
              placeholder="Enter your new password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
