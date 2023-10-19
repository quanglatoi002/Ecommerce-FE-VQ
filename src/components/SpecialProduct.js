import React, { memo } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const SpecialProduct = (props) => {
    const { title, brand, totalRatings, price, sold, quantity, id, images } =
        props;
    console.log(props);
    return (
        <div className="col-6 d-flex lg:mb-3 mb-2">
            <div className="special-product-card">
                <div className="d-flex flex-1 flex-column lg:flex-row justify-content-between">
                    <div className="special-product-img">
                        <img
                            className="response-img"
                            src={images}
                            alt="watch"
                        />
                    </div>
                    <div className="special-product-content">
                        <h5 className="brand">{brand}</h5>

                        <h6 className="title">{title}</h6>
                        <ReactStars
                            count={5}
                            size={24}
                            value={+totalRatings}
                            edit={false}
                            activeColor="#ffd700"
                            className="response-stars"
                        />
                        <p className="price">
                            <span className="red-p">$ {price}</span> &nbsp;
                            <strike>$ {sold}</strike>
                        </p>
                        {/* <div className="discount-till d-flex align-items-center gap-10">
                            <p>
                                <b>5 </b>days
                            </p>
                            <div className="d-flex gap-10 align-items-center">
                                <span className="badge rounded-circle bg-danger">
                                    1
                                </span>
                                <span className="badge rounded-circle bg-danger">
                                    1
                                </span>
                                <span className="badge rounded-circle bg-danger">
                                    1
                                </span>
                            </div>
                        </div> */}
                        <div className="prod-count my-3">
                            <p>Products: {quantity}</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                        width:
                                            (sold / (quantity + sold)) * 100 +
                                            "%",
                                    }}
                                    aria-valuenow={
                                        (sold / (quantity + sold)) * 100
                                    }
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                ></div>
                            </div>
                        </div>

                        <Link to={`/product/${id}`} className="blog-button">
                            <span>View</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(SpecialProduct);
