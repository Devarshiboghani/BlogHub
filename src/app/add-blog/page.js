"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import validateForm from "@/utils/validateForm";
import { imageUpload } from "@/services/uploadImage";
import "./addBlog.css";

const BASE_URL = "http://localhost:5000";

const AddBlog = () => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const [blog, setBlog] = useState({
    title: "",
    date: "",
    category: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      setChecking(false);
    }
  }, [router]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      const imageUrl = await imageUpload(file);
      setBlog((prev) => ({ ...prev, image: imageUrl }));
      setErrors((prev) => ({ ...prev, image: "" }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(blog);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blog,
          createdAt: new Date().toLocaleDateString(),
        }),
      });
      if (res.ok) {
        alert("Blog Added Successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("Add blog error:", error);
    }
  };

  if (checking) return null;

  return (
    <>
      <Header />
      <div className="add-blog-page">
        <div className="blog-card card-blog">
          <div className="blog-header">
            <h1>Create New Blog ✍️</h1>
            <p>Share your ideas with the world</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field-wrap">
              <input
                type="text"
                name="title"
                placeholder="Blog Title"
                value={blog.title}
                onChange={handleChange}
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </div>

            <div className="row-fields">
              <select
                name="category"
                value={blog.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="Fashion">Fashion</option>
                <option value="Food">Food</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
              </select>
              {errors.category && (
                <span className="error">{errors.category}</span>
              )}

              <input
                type="text"
                name="date"
                value={blog.date || ""}
                placeholder="dd/mm/yyyy"
                onChange={handleChange}
                required
              />
              {errors.date && <span className="error">{errors.date}</span>}
            </div>

            <div className="field-wrap">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {errors.image && <span className="error">{errors.image}</span>}
            </div>

            {blog.image && (
              <div className="image-preview">
                <img src={blog.image} alt="preview" />
              </div>
            )}

            <div className="field-wrap">
              <textarea
                name="content"
                placeholder="Write your blog content..."
                rows="3"
                value={blog.content}
                onChange={handleChange}
              />
              {errors.content && (
                <span className="error">{errors.content}</span>
              )}
            </div>

            <button type="submit" disabled={uploading}>
              {uploading ? "Uploading Image..." : "🚀 Publish Blog"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
