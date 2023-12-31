import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/products/productSlice";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5003";

const Header = () => {
    const [categoryItems, setCategoryItems] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const socket = io(ENDPOINT);
    const [paginate, setPaginate] = useState(true);
    const [totalAmount, setTotalAmount] = useState(null);
    console.log(totalAmount);
    const [productOpt, setProductOpt] = useState([]);

    console.log(productOpt);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userCartState = useSelector((state) => state?.auth?.cartProducts);
    console.log(userCartState);
    const authState = useSelector((state) => state?.auth);
    console.log(authState);
    const productState = useSelector((state) => state?.product?.products);

    useEffect(() => {
        const category = productState?.map((item, index) => item.category);
        const uniqueCategories = [...new Set(category)];

        setCategoryItems(uniqueCategories);
    }, [productState]);

    // const options = productOpt(0, 1000).map((o) => `Item ${o}`);

    useEffect(() => {
        if (userCartState?.length === 0) {
            setTotalAmount(0);
        } else {
            const totalAmount = userCartState?.reduce((accumulator, item) => {
                const itemTotal = Number(item.quantity) * item.price;
                return accumulator + itemTotal;
            }, 0);
            setTotalAmount(totalAmount);
        }
    }, [userCartState]);

    useEffect(() => {
        let data = [];
        for (let index = 0; index < productState.length; index++) {
            const element = productState[index];
            data.push({ id: index, prod: element?._id, name: element?.title });
        }
        setProductOpt(data);
    }, [productState]);

    const handleLogout = async () => {
        localStorage.clear();
        window.location.reload();
    };

    const [notifications, setNotifications] = useState([]);
    console.log(notifications);
    useEffect(() => {
        // Lắng nghe sự kiện "notification" từ máy chủ Redis
        socket.on("notifications", (message) => {
            setNotifications([...notifications, message.message]);
        });

        // Hủy đăng ký sự kiện khi component bị hủy
        return () => {
            socket.disconnect();
        };
    }, [notifications, socket]);

    const handleShow = () => {
        setIsShow((prev) => !prev);
    };

    return (
        <>
            <header className="header-top-strip py-3">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">
                            <p className="text-white mb-0">Free Shipping</p>
                        </div>
                        <div className="col-6">
                            <p className="text-end text-white mb-0">
                                Hotline:{" "}
                                <a href="tel:+84 988724604"> 84+ 988724604</a>
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            <header className="header-upper py-3">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="response-mobile col-2">
                            <h2 className="m-0">
                                <Link to={"/"} className="text-white">
                                    <img
                                        src="../images/logo-a.png"
                                        alt="ecommerce"
                                        height={60}
                                        width={100}
                                        style={{ objectFit: "cover" }}
                                    ></img>
                                </Link>
                            </h2>
                        </div>
                        <div className="col-5">
                            <div className="input-group">
                                <Typeahead
                                    id="pagination-example"
                                    onPaginate={() =>
                                        console.log("Results paginated")
                                    }
                                    onChange={(selected) => {
                                        navigate(
                                            `/product/${selected[0]?.prod}`
                                        );
                                        dispatch(
                                            getAProduct(selected[0]?.prod)
                                        );
                                    }}
                                    options={productOpt}
                                    paginate={paginate}
                                    labelKey={"name"}
                                    placeholder="Search for Products here"
                                    minLength={2}
                                />
                                <span
                                    className="input-group-text p-3"
                                    id="basic-addon2"
                                >
                                    <BsSearch className="fs-6" />
                                </span>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="header-upper-links d-flex align-items-center justify-content-between">
                                <div>
                                    {/* <Link
                                        to="/compare-product"
                                        className="d-flex align-items-center gap-10 text-white"
                                    >
                                        <img
                                            src="../images/compare.svg"
                                            alt="compare"
                                        />
                                        <p className="mb-0">
                                            Compare <br /> Products
                                        </p>
                                    </Link> */}
                                </div>
                                <div>
                                    <Link
                                        to="/wishlist"
                                        className="d-flex align-items-center gap-10 text-white"
                                    >
                                        <img
                                            src="../images/wishlist.svg"
                                            alt="wishlist"
                                        />
                                        <p className="mb-0 d-none d-lg-block">
                                            Favourite <br /> wishlist
                                        </p>
                                    </Link>
                                </div>
                                {/* Notifi */}
                                <div
                                    onClick={handleShow}
                                    className="d-flex align-items-center gap-10 text-white position-relative"
                                >
                                    <img
                                        className=""
                                        src="../images/notifi.svg"
                                        alt="notification"
                                    />

                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-black">
                                        {notifications?.length || 0}
                                    </span>
                                    {isShow && (
                                        <div className="notification">
                                            <div className="notification-up text-black">
                                                Notification
                                            </div>

                                            <div className="notification-main text-black">
                                                <div className="notification-content text-black">
                                                    {notifications.length >
                                                        0 && (
                                                        <ul className="notification-info">
                                                            {notifications?.map(
                                                                (
                                                                    notification,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        className="notification-info-li"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            notification
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Link
                                        to={
                                            authState && authState.user === null
                                                ? "/login"
                                                : "/my-profile"
                                        }
                                        className="d-flex align-items-center gap-10 text-white"
                                    >
                                        <img
                                            src="../images/user.svg"
                                            alt="user"
                                        />
                                        {authState &&
                                        authState.user === null ? (
                                            <p className="mb-0">
                                                Log in <br /> Account
                                            </p>
                                        ) : (
                                            `Welcome ${
                                                authState.user.firstname +
                                                authState.user.lastname
                                            } `
                                        )}
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        to="/cart"
                                        className="d-flex align-items-center gap-10 text-white"
                                    >
                                        <img
                                            src="../images/cart.svg"
                                            alt="cart"
                                        />
                                        <div className="d-flex flex-column gap-10">
                                            <span className="badge bg-white text-dark">
                                                {userCartState?.length
                                                    ? userCartState?.length
                                                    : 0}
                                            </span>
                                            <p className="mb-0">
                                                ${totalAmount ? totalAmount : 0}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <header className="header-bottom py-3">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="menu-bottom d-flex align-items-center gap-30">
                                <div>
                                    <div className="response-mobile-navbar dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src="../images/menu.svg"
                                                alt="menu"
                                            />
                                            <span className="me-5 d-inline-block">
                                                Show Categories
                                            </span>
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                        >
                                            {categoryItems?.map(
                                                (item, index) => (
                                                    <li key={index}>
                                                        <Link
                                                            className="dropdown-item text-white"
                                                            to={`/product?category=${item}&&`}
                                                        >
                                                            {item}
                                                        </Link>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <div className="response-mobile-navbar2  menu-links">
                                    <div className="d-flex align-items-center gap-15">
                                        <NavLink to="/">Home</NavLink>
                                        <NavLink to="/product">
                                            Our Store
                                        </NavLink>
                                        <NavLink to="/my-orders">
                                            My Orders
                                        </NavLink>
                                        <NavLink to="/blog">Blogs</NavLink>
                                        <NavLink to="/contact">Contact</NavLink>
                                        {authState?.isSuccess && (
                                            <button
                                                onClick={handleLogout}
                                                className="border border-0 bg-transparent text-white text-uppercase"
                                                type="button"
                                            >
                                                Logout
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
