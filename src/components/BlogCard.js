import React from "react";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
    const { id, title, description, date, image } = props;
    return (
        <div className="blog-card">
            <div className="cart-image">
                <img
                    src={image ? image : "images/blog-1.jpg"}
                    className="img-fluid"
                    alt="blog"
                />
            </div>
            <div className="blog-content">
                <p className="date">{date}</p>
                <h5 className="title">{title}</h5>
                <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                        __html:
                            description.length > 50
                                ? description?.substr(0, 50) + "..."
                                : description,
                    }}
                ></p>
                <Link to={"/blog/" + id} className="blog-button">
                    <span>Read More</span>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
