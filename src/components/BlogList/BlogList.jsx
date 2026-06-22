"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sorting from "@/components/Sorting/Sorting";
import Filtering from "@/components/Filtering/Filtering";
import Pagination from "@/components/Pagination/Pagination";
import "./BlogList.css";

const BASE_URL = "http://localhost:5000";
const BLOGS_PER_PAGE = 3;

const BlogList = ({ search = "" }) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${BASE_URL}/blogs`);
      const data = await res.json();
      setBlogs(data);
      setFilteredBlogs(data);
    } catch (error) {
      console.error("Blogs fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Search + Filter + Sort
  useEffect(() => {
    let result = [...blogs];

    // Search
    if (search) {
      result = result.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(search.toLowerCase()) ||
          blog.category?.toLowerCase().includes(search.toLowerCase()) ||
          blog.author?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory && filterCategory !== "All") {
      result = result.filter(
        (blog) => blog.category?.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Sort
    if (sortType === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "za") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortType === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortType === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortType === "category") {
      result.sort((a, b) => a.category?.localeCompare(b.category));
    }

    setFilteredBlogs(result);
    setCurrentPage(1);
  }, [search, blogs, sortType, filterCategory]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;
    try {
      await fetch(`${BASE_URL}/blogs/${id}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/edit-blog/${id}`);
  };

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  if (loading) {
    return (
      <section className="blogs-section">
        <h2>Latest Blogs</h2>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
          Loading blogs...
        </p>
      </section>
    );
  }

  return (
    <section className="blogs-section">
      <h2>Latest Blogs</h2>

      <div className="blogs-controls">
        <Filtering
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
        <Sorting sortType={sortType} setSortType={setSortType} />
      </div>

      <div className="blogs-grid">
        {paginatedBlogs.length > 0 ? (
          paginatedBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              {blog.image && (
                <img src={blog.image} alt={blog.title} width={400} height={220} />
              )}
              <div className="blog-content">
                <span>{blog.category}</span>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <small>{blog.date}</small>
                <div className="blog-actions">
                  <button onClick={() => handleEdit(blog.id)} className="edit-btn">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(blog.id)} className="delete-btn">
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-blogs">No Blogs Found</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
};

export default BlogList;