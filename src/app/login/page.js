"use client";

import Link from "next/link";
import "./login.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/redux/actions/blogAction";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, isError, user } = useSelector((state) => state.authStore);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    if (currentUser) {
      router.replace("/");
    }
  }, [router]);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="login-container">
        <h2>Logging in...</h2>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p className="login-subtitle">Login to continue reading blogs</p>
        {isError && <p className="error-msg">{isError}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChanged}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChanged}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
