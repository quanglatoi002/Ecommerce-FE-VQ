import React from "react";
import { BreadCrumb } from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Container from "../components/Container";

const SingleBlog = () => {
    return (
        <>
            <Meta title={"Dynamic Blog Name"} />
            <BreadCrumb title="Dynamic Blog Name" />
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
                            <h3 className="title">
                                A Beautiful Sunday Morning
                            </h3>

                            <img
                                src="../images/blog-1.jpg"
                                alt="blog"
                                className="img-fluid w-100 my-4"
                            />
                            <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Cum vero qui fugit sequi,
                                aliquid molestiae ullam explicabo itaque ad
                                incidunt laboriosam exercitationem veniam beatae
                                labore voluptas, provident possimus. Iure,
                                provident?
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default SingleBlog;
