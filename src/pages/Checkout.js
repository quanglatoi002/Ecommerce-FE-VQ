import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";

const Checkout = () => {
    return (
        <>
            <Container class1="checkout-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h3 className="website-name">Dev</h3>
                            <nav
                                style={{ "--bs-breadcrumb-divider": ">" }}
                                aria-label="breadcrumb"
                            >
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item total-price">
                                        <Link className="text-dark" to="/cart">
                                            Cart
                                        </Link>
                                    </li>
                                    &nbsp; /
                                    <li
                                        className="breadcrumb-item total-price active"
                                        aria-current="page"
                                    >
                                        Information
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item total-price active">
                                        Shipping
                                    </li>
                                    &nbsp; /
                                    <li
                                        className="breadcrumb-item total-price active"
                                        aria-current="page"
                                    >
                                        Payment
                                    </li>
                                </ol>
                            </nav>
                            <h4 className="title total">Contact Information</h4>
                            <p className="user-details">
                                VQ (quanglatoi002@gmail.com)
                            </p>
                            <h4 className="mb-3">Shipping Address</h4>
                            <form
                                action=""
                                className="d-flex gap-15 flex-wrap justify-content-between"
                            >
                                <div className="w-100">
                                    <select
                                        className="form-control form-select"
                                        name=""
                                        id=""
                                    >
                                        <option value="" selected disabled>
                                            Select Country
                                        </option>
                                    </select>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        placeholder="First Name"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        placeholder="Last Name"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="w-100">
                                    <input
                                        placeholder="Address"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="w-100">
                                    <input
                                        placeholder="Apartment, Suite, etc"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        placeholder="City"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <select
                                        className="form-control form-select"
                                        name=""
                                        id=""
                                    >
                                        <option value="" selected disabled>
                                            State
                                        </option>
                                    </select>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        placeholder="ZipCode"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to="/cart" className="text-dark">
                                            <BiArrowBack className="me-2" />
                                            Return to Cart
                                        </Link>
                                        <Link className="button" to="/cart">
                                            Continue to Shipping
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            <div className="d-flex gap-10 mb-2 align-items-center">
                                <div className="w-75 d-flex gap-10">
                                    <div className="w-25 position-relative">
                                        <span
                                            style={{
                                                top: "-20px",
                                                right: "2px",
                                            }}
                                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                                        >
                                            1
                                        </span>
                                        <img
                                            className="img-fluid"
                                            src="../images/watch.jpg"
                                            alt="product"
                                        />
                                    </div>
                                    <div>
                                        <h5 className="total-price">gf</h5>
                                        <p className="total-price">s / #agg</p>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="total">$ 100</h5>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="total">SubTotal</p>
                                <p className="total-price">$ 10000</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 total">Shipping</p>
                                <p className="mb-0 total-price">$ 10000</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="total">Total</h4>
                                <h5 className="total-price">$ 10000</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Checkout;
