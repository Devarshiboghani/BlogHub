"use client";

import Link from "next/link";
import "./signup.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "@/redux/actions/blogAction";

const SignupPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, isError, isCreate } = useSelector((state) => state.authStore);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(formData));
    e.target.reset();
  };

  useEffect(() => {
    if (isCreate) router.push("/login");
  }, [isCreate, router]);

  if (isLoading) {
    return (
      <div className="signup-container">
        <h2>Creating account...</h2>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account 🚀</h2>
        <p className="signup-subtitle">Join BlogHub and start your journey</p>
        {isError && <p className="error-msg">{isError}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstname" placeholder="Enter your first name"
              value={formData.firstname} onChange={handleChanged} required />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastname" placeholder="Enter your last name"
              value={formData.lastname} onChange={handleChanged} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email"
              value={formData.email} onChange={handleChanged} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter password"
              value={formData.password} onChange={handleChanged} required />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Confirm password"
              value={formData.confirmPassword} onChange={handleChanged} required />
          </div>

          <button type="submit" className="signup-btn">Create Account</button>
        </form>

        <div className="login-link">
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;