import React, { memo, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { addToWishList } from "../features/products/productSlice";

const ProductCard = (props) => {
    const { grid, data } = props;
    const dispatch = useDispatch();
    let location = useLocation();
    const navigate = useNavigate();

    const addToWish = (id) => {
        dispatch(addToWishList(id));
    };
    return (
        <>
            {data?.map((item, index) => (
                <div
                    key={index}
                    className={`${
                        location.pathname === "/product"
                            ? `gr-${grid}`
                            : "col-3"
                    }`}
                >
                    <div
                        // to={`${
                        //     location.pathname === "/"
                        //         ? "product/:id"
                        //         : `${location.pathname}/:id`
                        // }`}
                        className="product-card position-relative"
                    >
                        <div className="wishlist-icon position-absolute">
                            <button
                                onClick={(e) => {
                                    addToWish(item?._id);
                                }}
                                className="border-0 bg-transparent"
                            >
                                <img src="../images/wish.svg" alt="wishlist" />
                            </button>
                        </div>
                        <div className="product-image">
                            <img
                                className="img-fluid mx-auto"
                                src={item?.images[0].url}
                                alt="product images"
                                width={160}
                            />
                            <img
                                className="img-fluid mx-auto"
                                src="../images/watch.jpg"
                                alt="product images"
                            />
                        </div>

                        <div className="product-details">
                            <h6 className="brand">{item?.brand}</h6>
                            <h5 className="product-title">{item?.title}</h5>
                            <ReactStars
                                count={5}
                                size={24}
                                value={item?.totalRatings.toString()}
                                edit={false}
                                activeColor="#ffd700"
                            />
                            <p
                                className={`description ${
                                    grid === 12 ? "d-block" : "d-none"
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: item?.description,
                                }}
                            ></p>
                            <p className="price">${item?.price}</p>
                        </div>
                        <div className="action-bar position-absolute">
                            <div className="d-flex flex-column gap-15">
                                {/* <button className="border-0 bg-transparent">
                                    <img
                                        src="../images/prodcompare.svg"
                                        alt="prodcompare"
                                    />
                                </button> */}
                                <button className="border-0 bg-transparent">
                                    <img
                                        onClick={() =>
                                            navigate(`/product/${item?._id}`)
                                        }
                                        src="../images/view.svg"
                                        alt="view"
                                    />
                                </button>

                                <button className="border-0 bg-transparent">
                                    <img
                                        src="../images/add-cart.svg"
                                        alt="addCart"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default memo(ProductCard);
