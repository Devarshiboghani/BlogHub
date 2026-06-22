"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { FaPenNib, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import "./Header.css";

const Header = ({ search, setSearch, setSearchText }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  // ✅ router change hone par user state update hogi
  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, [router]);

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
    setUser(null); // ✅ turant Header update
    router.replace("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (setSearchText) setSearchText(search);
    if (setSearch) setSearch("");
  };

  return (
    <Navbar expand="lg" className="custom-navbar" sticky="top">
      <Container className="navbar-container">
        <Navbar.Brand as={Link} href="/" className="logo">
          <FaPenNib className="logo-icon" />
          <span>BlogHub</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="border-0 shadow-none" />

        <Navbar.Collapse id="navbar-nav">
          <div className="nav-actions ms-auto">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search blogs..."
                className="search-input"
                value={search || ""}
                onChange={(e) => setSearch && setSearch(e.target.value)}
              />
              <Button type="submit" className="search-btn" variant="light">
                <FaSearch />
              </Button>
            </form>

            {user ? (
              <>
                <Link href="/add-blog">
                  <Button className="login-btn">Add Blog</Button>
                </Link>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button className="login-btn">Login</Button>
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;