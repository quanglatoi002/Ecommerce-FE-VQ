import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
    return (
        <div className="blog-card">
            <div className="cart-image">
                <img src="images/blog-1.jpg" className="img-fluid" alt="blog" />
            </div>
            <div className="blog-content">
                <p className="date">1 Dec, 2022</p>
                <h5 className="title">
                    A beautiful sunday morning renaissance
                </h5>
                <p className="desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Inventore perspiciatis vero veritatis officiis distinctio.
                </p>
                <Link to="/blog/:id" className="button">
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
