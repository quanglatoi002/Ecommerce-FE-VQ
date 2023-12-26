import React, { useEffect, useState, lazy, Suspense } from "react";
import { NavLink, Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import { services } from "../utils/Data";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";
import { getAllProducts } from "../features/products/productSlice";
import HomeInfo from "../components/HomeInfo";
const BlogCard = lazy(() => import("../components/BlogCard"));

const Home = () => {
    const dispatch = useDispatch();

    //call API
    useEffect(() => {
        Promise.all([dispatch(getAllProducts()), dispatch(getAllBlogs())]);
    }, [dispatch]);

    const productStateA = useSelector((state) => state?.product?.products);
    const productStates = useSelector((state) => state?.productLocal?.products);
    const productState =
        productStateA.length === 0 ? productStates : productStateA;

    const blogState = useSelector((state) => state?.blog?.blog);
    console.log(productState);

    return (
        <>
            <Container class1="home-wrapper-1 py-5">
                <div className="row gap-0-10">
                    {productState?.length > 0 &&
                        productState
                            ?.filter((i) => i?.tags === "Super")
                            ?.map((item, index) => (
                                <div className="col-lg-6 col-12">
                                    <div className="main-banner position-relative h-100">
                                        <img
                                            src={item.images[0].url}
                                            className="img-fluid rounded-3 h-100"
                                            alt="main banner"
                                        />
                                        <div className="main-banner-content position-absolute">
                                            <h4>{item.tags}</h4>
                                            <h5>{item.title}</h5>
                                            <p className="text-white">
                                                ${item.price}
                                            </p>
                                            <Link
                                                to={`/product/${item._id}`}
                                                className="blog-button"
                                            >
                                                <span>View</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                    <div className="col-lg-6 col-12">
                        <div className="response-pc flex d-flex flex-wrap align-items-center">
                            {productState?.length > 0 &&
                                productState
                                    ?.filter((i) => i?.tags === "Sake")
                                    ?.map((item, index) => (
                                        <div className="small-banner position-relative">
                                            <img
                                                src={item.images[0].url}
                                                className="rounded-3 img-css"
                                                alt="main banner"
                                            />
                                            <div className="small-banner-content position-absolute">
                                                <h4>{item.tags}</h4>
                                                <h5>{item.title}</h5>
                                                <p className="text-white">
                                                    ${item.price}
                                                </p>
                                                <Link
                                                    to={`/product/${item._id}`}
                                                    className="blog-button"
                                                >
                                                    <span>View</span>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="home-wrapper-2 lg:py-5 py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="services d-flex align-items-center justify-content-between">
                            {services?.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-center gap-15"
                                >
                                    <img src={item.image} alt="services" />
                                    <div className="response-mobile-contact">
                                        <h6>{item.title}</h6>
                                        <p className="mb-0 lg:d-block d-none">
                                            {item.tagline}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
            <HomeInfo />
            <Container class1="featured-wrapper py-lg-5 py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Featured Collection</h3>
                    </div>
                    {productState?.length > 0 &&
                        productState
                            ?.filter((i) => i?.tags === "featured")
                            ?.map((item) => (
                                <SpecialProduct
                                    key={item?._id}
                                    title={item?.title}
                                    brand={item?.brand}
                                    totalRatings={item?.totalRatings.toString()}
                                    price={item?.price}
                                    sold={item?.sold}
                                    quantity={item?.quantity}
                                    id={item?._id}
                                    images={item?.images[0].url}
                                />
                            ))}
                </div>
            </Container>

            <Container class1="special-wrapper py-lg-5 py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Special Product</h3>
                    </div>
                </div>
                <div className="row">
                    {productState?.length > 0 &&
                        productState
                            ?.filter((i) => i?.tags === "special")
                            ?.map((item, index) => (
                                <SpecialProduct
                                    key={item?._id}
                                    title={item?.title}
                                    brand={item?.brand}
                                    totalRatings={item?.totalRatings.toString()}
                                    price={item?.price}
                                    sold={item?.sold}
                                    quantity={item?.quantity}
                                    id={item?._id}
                                    images={item?.images[0]?.url}
                                />
                            ))}
                </div>
            </Container>
            <Container class1="popular-wrapper py-lg-5 py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">
                            Our Popular Products
                        </h3>
                    </div>
                </div>
                <div className="row">
                    {productState?.length > 0 &&
                        productState
                            ?.filter((i) => i.tags === "popular")
                            ?.map((item) => (
                                <ProductCard key={item?._id} data={[item]} />
                            ))}
                </div>
            </Container>
            <Container class1="marque-wrapper py-lg-5 py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="marquee-inner-wrapper card-wrapper">
                            <Marquee className="d-flex">
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-01.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-02.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-03.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-04.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-05.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-06.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-07.png"
                                        alt="brand"
                                    />
                                </div>
                                <div>
                                    <img
                                        src="images/brand-08.png"
                                        alt="brand"
                                    />
                                </div>
                            </Marquee>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="blog-wrapper py-lg-5 py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Latest Blogs</h3>
                    </div>

                    <div className="row">
                        {Array.isArray(blogState) &&
                            blogState?.length > 0 &&
                            blogState
                                ?.filter((i, index) => index < 4)
                                .map((item) => (
                                    <div key={item?._id} className="col-3">
                                        <Suspense
                                            fallback={
                                                <div className="">
                                                    Loading...
                                                </div>
                                            }
                                        >
                                            <BlogCard
                                                id={item?._id}
                                                title={item?.title}
                                                description={item?.description}
                                                image={item?.images[0]?.url}
                                                date={moment(
                                                    item?.created_at
                                                ).format(
                                                    "MMMM Do YYYY, h:mm a"
                                                )}
                                            />
                                        </Suspense>
                                    </div>
                                ))}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Home;
