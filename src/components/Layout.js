import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AudioCircle from "./AudioCircles";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { getAllProducts } from "../features/products/productSlice";

const Layout = () => {
    const dispatch = useDispatch();
    const blogState = useSelector((state) => state?.blog.blog);

    useEffect(() => {
        Promise.all([dispatch(getAllProducts()), dispatch(getAllBlogs())]);
    }, [dispatch]);
    console.log(blogState);
    return (
        <>
            {blogState.length > 0 ? (
                <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>
            ) : (
                <div className="audioCircle">
                    <AudioCircle />
                </div>
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Layout;
