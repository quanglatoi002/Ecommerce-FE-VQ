import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blogs/blogSlice";
import { fetchCache, setCache } from "../features/LRUCache/lruSlice";

const SingleBlog = () => {
    const [getBlog, setGetBlog] = useState("");
    const dispatch = useDispatch();
    const location = useLocation();
    const getBlogId = location.pathname.split("/")[2];
    console.log(getBlogId);
    const blogState = useSelector(
        (state) => state?.lruCache?.payload?.getBlog ?? getBlog
    );

    //call API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Kiểm tra cache trước
                const cachedData = await dispatch(fetchCache(getBlogId));
                if (cachedData?.payload !== undefined) {
                    console.log("Data from cache:", cachedData);
                } else {
                    // Nếu không có trong cache, gọi API và lưu vào cache
                    const data = await dispatch(getABlog(getBlogId));
                    await setGetBlog(data);
                    console.log("Data from API:", data);
                    // Lưu dữ liệu vào cache
                    dispatch(setCache({ key: getBlogId, value: data }));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [dispatch, getBlogId]);

    return (
        <>
            <Meta title={blogState?.title} />
            <BreadCrumb title={blogState?.title} />
            <Container class1="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link
                                to="/blog"
                                className="d-flex align-items-center gap-10"
                            >
                                <HiOutlineArrowLeft className="fs-4" />
                                Back to blog
                            </Link>
                            <div className="header-blog">
                                <h3 className="title">{blogState?.title}</h3>
                                <div className="blog-view">
                                    {`View: ${blogState?.numViews}`}
                                </div>
                            </div>

                            <img
                                src={
                                    blogState?.images
                                        ? blogState?.images[0].url
                                        : "../images/blog-1.jpg"
                                }
                                alt="blog"
                                className="img-fluid w-100 my-4"
                            />
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: blogState?.description,
                                }}
                            ></p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default SingleBlog;
