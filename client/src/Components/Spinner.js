import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const[count,setCount] = useState(3);
  const navigate = useNavigate();
    
  useEffect(()=>{
    const interval = setInterval(()=>{
      setCount((preVal) => --preVal);
    },1000);
    count === 0 && navigate('/login');
    
    return () => clearInterval(interval);

    },[count, navigate]);
    
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h3 className="Text-center">Redirecting you in {count} seconds</h3>
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
