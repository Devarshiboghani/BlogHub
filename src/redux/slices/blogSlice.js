import { createSlice } from "@reduxjs/toolkit";
import {
  createBlog,
  getAllBlogs,
  deleteBlog,
  getOneBlog,
  updateBlog,
  filterBlogs,
} from "../actions/blogAction";

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    blogs: [],
    blog: null,
    data: [],
    isLoding: false,
    isError: false,
    isCreate: false,
  },

  reducers: {
    //Sorting
    sortBlogs: (state, action) => {
      const sortType = action.payload;

      if (sortType === "az") {
        state.blogs = [...state.blogs].sort((a, b) =>
          a.title.localeCompare(b.title),
        );
      }

      if (sortType === "za") {
        state.blogs = [...state.blogs].sort((a, b) =>
          b.title.localeCompare(a.title),
        );
      }

      if (sortType === "newest") {
        state.blogs = [...state.blogs].sort(
          (a, b) =>
            new Date(b.date.split("/").reverse().join("-")) -
            new Date(a.date.split("/").reverse().join("-")),
        );
      }

      if (sortType === "oldest") {
        state.blogs = [...state.blogs].sort(
          (a, b) =>
            new Date(a.date.split("/").reverse().join("-")) -
            new Date(b.date.split("/").reverse().join("-")),
        );
      }
    },

    //Searching
    searchBlogs: (state, action) => {
      const searchText = action.payload.toLowerCase().trim();

      if (!searchText) {
        state.blogs = state.data;
        return;
      }

      state.blogs = state.data.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchText) ||
          blog.category.toLowerCase().includes(searchText) ||
          blog.tag.toLowerCase().includes(searchText),
      );
    },
  },

  extraReducers: (builder) => {
    //Create blogs
    builder.addCase(createBlog.pending, (state) => {
      ((state.isLoding = true), (state.isCreate = false));
    });
    builder.addCase(createBlog.fulfilled, (state) => {
      ((state.isLoding = false), (state.isCreate = true));
    });
    builder.addCase(createBlog.rejected, (state, action) => {
      ((state.isLoding = false),
        (state.isCreate = false),
        (state.isError = action.payload));
    });

    //Get All Blogs
    builder.addCase(getAllBlogs.pending, (state) => {
      ((state.isLoding = true), (state.isCreate = false));
    });

    builder.addCase(getAllBlogs.fulfilled, (state, action) => {
      state.isLoding = false;
      state.blogs = action.payload;
      state.data = action.payload;
    });

    builder.addCase(getAllBlogs.rejected, (state, action) => {
      ((state.isLoding = false),
        (state.isCreate = false),
        (state.isError = action.payload));
    });

    //Delete Blogs
    builder.addCase(deleteBlog.pending, (state) => {
      state.isLoding = true;
    });

    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.isLoding = false;
      state.blogs = state.blogs.filter((pro) => pro.id != action.payload);
    });

    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.isLoding = false;
      state.isError = action.payload;
    });

    //Get One Blog
    builder.addCase(getOneBlog.pending, (state) => {
      state.isLoding = true;
    });
    builder.addCase(getOneBlog.fulfilled, (state, action) => {
      ((state.isLoding = false), (state.blog = action.payload));
    });
    builder.addCase(getOneBlog.rejected, (state) => {
      ((state.isLoding = false), (state.isError = action.payload));
    });

    //Update Blog
    builder.addCase(updateBlog.pending, (state) => {
      ((state.isLoding = true), (state.isCreate = false));
    });
    builder.addCase(updateBlog.fulfilled, (state) => {
      ((state.isLoding = false), (state.blog = null));
      state.isCreate = true;
    });
    builder.addCase(updateBlog.rejected, (state, action) => {
      ((state.isLoding = false), (state.isError = true));
      state.isError = action.payload;
    });

    //Filter by Category
    builder.addCase(filterBlogs.pending, (state) => {
      state.isLoding = true;
    });

    builder.addCase(filterBlogs.fulfilled, (state, action) => {
      state.isLoding = false;
      state.blogs = action.payload;
    });

    builder.addCase(filterBlogs.rejected, (state, action) => {
      state.isLoding = false;
      state.isError = action.payload;
    });
  },
});

export const { sortBlogs, searchBlogs } = blogSlice.actions;

export default blogSlice.reducer;
