import { useState, React } from "react";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/authStyles.css";

const Register = () => {
  // hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [security_ans, setSecurityAns] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register/",
        { name, email, password, phone, security_ans }
      );

      if (res.data.success) {
        // toast.success(res.data.msg);
        alert(`✅ ${res.data.msg}`);

        navigate("/login");
      } else {
        // toast.error(res.data.msg);
        alert(`Error: ${res.data.msg}`);
      }
    } catch (err) {
      console.log(err);
      // toast.error("Something went wrong!");
      alert(`❌ Something went wrong, Please try again!`);
    }
  };

  return (
    <Layout title="Register | E-Commerce App">
      <div className="form-container">
        <form onSubmit={onSubmitHandler}>
          <h1 className="mb-5 text-center">Sign Up</h1>
          <div className="mb-2">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              required
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
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-dark form-control input-field"
              id="exampleInputPassword"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone
            </label>
            <input
              required
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-dark form-control input-field"
              id="exampleInputPhone"
              placeholder="Enter your phone no"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputAnswer" className="form-label">
              Security Question: Which is your favourite city?
            </label>
            <input
              required
              type="text"
              value={security_ans}
              onChange={(e) => setSecurityAns(e.target.value)}
              className="bg-dark form-control input-field"
              id="exampleInputAnswer"
              placeholder="Enter your security answer"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>

          <p className="text-center text-light p-3 forgot-signin-signup">
            Already got an account?
            <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
