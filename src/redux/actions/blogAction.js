import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createBlog = createAsyncThunk("blogs/createBlog", async (data, { rejectWithValue }) => {
    try {
        let res = await axios.post("http://localhost:5000/blogs", data)
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getAllBlogs = createAsyncThunk("blogs/getAllBlogs", async (data, { rejectWithValue }) => {
    try {
        let res = await axios.get("http://localhost:5000/blogs", data)
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`http://localhost:5000/blogs/${id}`)
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getOneBlog = createAsyncThunk("blogs/getOneBlog", async (id, { rejectWithValue }) => {
    try {
        let res = await axios.get(`http://localhost:5000/blogs/${id}`)
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const updateBlog = createAsyncThunk("blogs/updateBlog", async (data, { rejectWithValue }) => {
    try {
        let res = await axios.put(`http://localhost:5000/blogs/${data.id}`, data)
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const filterBlogs = createAsyncThunk("blogs/filterBlogs", async (category, { rejectWithValue }) => {
    try {
        const res = await axios.get(`http://localhost:5000/blogs?category=${category}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.get(`http://localhost:5000/users?email=${data.email}&password=${data.password}`);
        if (res.data.length === 0) {
            return rejectWithValue("Invalid email or password!");
        }
        return res.data[0];
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const signUp = createAsyncThunk("auth/signUp", async (data, { rejectWithValue }) => {
    try {
        if (data.password !== data.confirmPassword) {
            return rejectWithValue("Passwords do not match!");
        }
        const check = await axios.get(`http://localhost:5000/users?email=${data.email}`);
        if (check.data.length > 0) {
            return rejectWithValue("Email already registered!");
        }
        const { confirmPassword, ...userData } = data;
        const res = await axios.post("http://localhost:5000/users", userData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});