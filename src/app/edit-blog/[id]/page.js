"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import { imageUpload } from "@/services/uploadImage";
import "../../add-blog/addBlog.css";

const BASE_URL = "http://localhost:5000";

const EditBlog = () => {
  const router = useRouter();
  const { id } = useParams();
  const [uploading, setUploading] = useState(false);

  const [blog, setBlog] = useState({
    title: "",
    date: "",
    category: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${BASE_URL}/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error("Fetch blog error:", error);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;
      const imageUrl = await imageUpload(file);
      setBlog((prev) => ({ ...prev, image: imageUrl }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });
      if (res.ok) {
        alert("Blog Updated Successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("Update blog error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="add-blog-page">
        <div className="blog-card">
          <div className="blog-header">
            <h1>Edit Blog ✏️</h1>
            <p>Update your blog details</p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={blog.title}
              onChange={handleChange}
              required
            />

            <div className="row-fields">
              <select
                name="category"
                value={blog.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Fashion">Fashion</option>
                <option value="Food">Food</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
              </select>
              <input
                type="text"
                name="date"
                value={blog.date || ""}
                placeholder="dd/mm/yyyy"
                onChange={handleChange}
                required
              />
            </div>

            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {blog.image && (
              <div className="image-preview">
                <img src={blog.image} alt="preview" width="200" />
              </div>
            )}

            <textarea
              name="content"
              placeholder="Write your blog content..."
              rows="3"
              value={blog.content}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={uploading}>
              {uploading ? "Uploading Image..." : "Update Blog"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
