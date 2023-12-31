import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BreadCrumb } from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
    addRating,
    getAProduct,
    getAllProducts,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { addToWishList } from "../features/products/productSlice";

const SingleProduct = () => {
    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [star, setStar] = useState(null);
    const [comment, setComment] = useState(null);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [popularProduct, setPopularProduct] = useState([]);

    const location = useLocation();
    const getProductId = location.pathname.split("/")[2];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productState = useSelector((state) => state?.product?.product);
    const productsState = useSelector((state) => state?.product?.products);
    const cartState = useSelector((state) => state.auth?.cartProducts);
    // add wishlist
    const addToWish = (id) => {
        console.log(id);
        dispatch(addToWishList(id));
    };

    useEffect(() => {
        for (let i = 0; i < cartState?.length; i++) {
            if (getProductId === cartState[i].productId?._id) {
                setAlreadyAdded(true);

                navigate("/cart");
            }
        }
    }, [cartState, getProductId, navigate]);

    const handleColorClick = useCallback((reqColor) => {
        setColor(reqColor);
    }, []);

    useEffect(() => {
        dispatch(getAProduct(getProductId));
        dispatch(getUserCart());
        dispatch(getAllProducts());
    }, [dispatch, getProductId]);

    useEffect(() => {
        const popularProducts =
            productsState &&
            productsState?.filter((element) => element?.tags === "popular");
        setPopularProduct(popularProducts);
    }, [productsState, dispatch, productState]);

    const addRatingToProduct = useCallback(async () => {
        if (star === null || comment === null) {
            toast.error(
                "Please add star rating and write a review about the product"
            );
            return;
        }
        try {
            await dispatch(
                addRating({
                    star: star,
                    comment: comment,
                    prodId: getProductId,
                })
            );

            await dispatch(getAProduct(getProductId));
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
            toast.error("An error occurred while adding the rating");
        }
    }, [dispatch, star, comment, getProductId]);

    const uploadCart = () => {
        if (color === null) {
            toast.error("Pls Choose Color");
            return false;
        } else {
            dispatch(
                addProdToCart({
                    productId: productState?._id,
                    quantity,
                    color,
                    price: productState?.price,
                })
            );
        }
    };

    const props = {
        width: 400,
        height: 600,
        zoomWidth: 600,
        img: productState?.images[0]?.url
            ? productState?.images[0]?.url
            : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
    };

    const [orderedProduct, setOrderedProduct] = useState(true);
    const copyToClipboard = (text) => {
        console.log("text", text);
        var textField = document.createElement("textarea");
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
    };

    //scroll to
    useEffect(() => {
        const targetPosition = document
            .getElementById("scrollTo")
            .getBoundingClientRect();
        window.scrollTo({
            top: targetPosition.top,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <>
            <Meta title={"Product Name"} />
            <BreadCrumb title={productState?.title} />
            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            {productState?.images.map((item) => (
                                <div key={item?._id}>
                                    <img
                                        src={item?.url}
                                        alt="images"
                                        className="img-fluid"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id="scrollTo" className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className="title">{productState?.title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">$ {productState?.price}</p>
                                <div className="d-flex align-items-center gap-10">
                                    {productState?.ratings?.length > 0 ? (
                                        productState?.ratings?.map((item) => (
                                            <div key={item?._id} className="">
                                                <div className="d-flex gap-10 align-items-center">
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        value={item?.star.toString()}
                                                        edit={false}
                                                        activeColor="#ffd700"
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={3}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                    )}
                                    <p className="mb-0 t-review">
                                        ({productState?.ratings?.length})
                                    </p>
                                </div>
                                <a
                                    className="review-btn"
                                    rel="stylesheet"
                                    href="#review"
                                >
                                    Write a Review
                                </a>
                            </div>
                            <div className="border-bottom py-3">
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Type :</h3>
                                    <p className="product-data">Watch</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Brand :</h3>
                                    <p className="product-data">
                                        {productState?.brand}
                                    </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">
                                        Category :
                                    </h3>
                                    <p className="product-data">
                                        {productState?.category}
                                    </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Tags :</h3>
                                    <p className="product-data">
                                        {productState?.tags}
                                    </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">
                                        Availability :
                                    </h3>
                                    <p className="product-data">In Stock</p>
                                </div>
                                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                    <h3 className="product-heading">Size :</h3>
                                    <div className="d-flex flex-wrap gap-15">
                                        <span className="badge border border-1 bg-white text-dark border-secondary">
                                            S
                                        </span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">
                                            M
                                        </span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">
                                            XL
                                        </span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">
                                            XXL
                                        </span>
                                    </div>
                                </div> */}
                                {alreadyAdded === false && (
                                    <>
                                        <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                            <h3 className="product-heading">
                                                <Color
                                                    setColor={handleColorClick}
                                                    colorData={
                                                        productState?.color
                                                    }
                                                />
                                            </h3>
                                        </div>
                                    </>
                                )}
                                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                                    {alreadyAdded === false && (
                                        <>
                                            <h3 className="product-heading">
                                                Quantity :
                                            </h3>
                                            <div className="">
                                                <input
                                                    className="form-control"
                                                    min={1}
                                                    max={10}
                                                    style={{ width: "50px" }}
                                                    type="number"
                                                    name=""
                                                    id=""
                                                    onChange={(e) =>
                                                        setQuantity(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={quantity}
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div
                                        className={`d-flex align-items-center gap-30 ${
                                            alreadyAdded ? "ms-0" : "ms-5"
                                        }`}
                                    >
                                        <button
                                            className="button border-0"
                                            type="submit"
                                            onClick={() => {
                                                alreadyAdded
                                                    ? navigate("/cart")
                                                    : uploadCart();
                                            }}
                                        >
                                            {alreadyAdded
                                                ? "Go to Cart"
                                                : "Add to Cart"}
                                        </button>
                                        {/* <button className="button signup">
                                            Buy It Now
                                        </button> */}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <button
                                        onClick={(e) => {
                                            addToWish(productState?._id);
                                        }}
                                        className="border-0 bg-transparent"
                                    >
                                        <img
                                            src="../images/wish.svg"
                                            alt="wishlist"
                                            width={18}
                                            height={18}
                                        />
                                    </button>
                                    <span className="sign-wishlist">
                                        Add wishlist
                                    </span>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-3">
                                    <h3 className="product-heading">
                                        Copy Product Link :
                                    </h3>
                                    <Link
                                        onClick={() => {
                                            copyToClipboard(
                                                window.location.href
                                            );
                                        }}
                                    >
                                        Copy Product Link
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className="bg-white p-3">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: productState?.description,
                                }}
                            ></p>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="reviews-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 id="review">Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className="mb-2">Customer Reviews</h4>
                                    <div className="d-flex align-items-center gap-10">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={"3"}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className="mb-0">
                                            Base on 2 Reviews
                                        </p>
                                    </div>
                                </div>
                                {orderedProduct && (
                                    <div>
                                        <a
                                            href="/"
                                            className="text-dark text-decoration-underline"
                                        >
                                            Write a Review
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="review-form py-4">
                                <h4>Write a Review</h4>
                                <div>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={"3"}
                                        edit={true}
                                        activeColor="#ffd700"
                                        onChange={(e) => setStar(e)}
                                    />
                                </div>
                                <div>
                                    <textarea
                                        className="w-100 form-control"
                                        name=""
                                        id=""
                                        cols={30}
                                        rows={10}
                                        placeholder="Comments"
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                    <button
                                        onClick={addRatingToProduct}
                                        type="submit"
                                        className="button border-0"
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                            <div className="reviews mt-4">
                                {productState &&
                                    productState?.ratings.map((item) => (
                                        <div key={item?._id} className="review">
                                            <div className="d-flex gap-10 align-items-center">
                                                <ReactStars
                                                    count={5}
                                                    size={24}
                                                    value={item?.star.toString()}
                                                    edit={false}
                                                    activeColor="#ffd700"
                                                />
                                            </div>
                                            <p className="mt-3">
                                                {item?.comment}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container className="popular-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">
                            Our Popular Products
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <ProductCard data={popularProduct} />
                </div>
            </Container>
        </>
    );
};

export default SingleProduct;
