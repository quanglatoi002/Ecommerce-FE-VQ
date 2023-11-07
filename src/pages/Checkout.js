import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import {
    createAOrder,
    deleteUserCard,
    resetState,
} from "../features/user/userSlice";

let shippingSchema = yup.object({
    firstName: yup.string().required("First Name is Required"),
    lastName: yup.string().required("Last Name  is Required"),
    address: yup.string().required("Address is Required"),
    state: yup.string().required("State is Required"),
    city: yup.string().required("City is Required"),
    country: yup.string().required("Country is Required"),
    other: yup.string().required("Other is Required"),
    pinCode: yup.string().required("pinCode is Required"),
});

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(null);
    const [shoppingInfo, setShoppingInfo] = useState(null);
    const [cartProductState, setCartProductState] = useState([]);

    const cartState = useSelector((state) => state?.auth?.cartProducts);
    console.log(cartProductState);
    const authState = useSelector((state) => state?.auth);

    useEffect(() => {
        if (
            authState.orderedProduct !== null &&
            authState.orderedProduct?.success === true
        ) {
            navigate("/my-orders");
        }
    }, [authState, navigate]);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            city: "",
            country: "",
            other: "",
            pinCode: "",
        },
        validationSchema: shippingSchema,
        onSubmit: async (values) => {
            console.log(values);
            // sử dụng await ngay tại setShoppingInfo thì sẽ ko hiệu quả cho nên phải dùng await new Promise
            await new Promise((resolve, reject) => {
                setShoppingInfo(values);
                resolve();
            });
            checkOutHandler();
        },
    });

    //create element for add in body
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onabort = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    //orderItems[{}]
    useEffect(() => {
        let items = [];
        for (let index = 0; index < cartState?.length; index++) {
            items.push({
                product: cartState[index].productId._id,
                quantity: cartState[index].quantity,
                color: cartState[index].color._id,
                price: cartState[index].price,
            });
        }
        setCartProductState(items);
    }, [cartState]);

    const checkOutHandler = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        //checkout
        const result = await axios.post(
            "http://localhost:5003/api/user/order/checkout",
            { amount: totalAmount },
            config
        );
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data.order;
        const options = {
            key: "rzp_test_OR9hf09RIN79Vg", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "VanQuang",
            description: "Test Transaction",
            // image: "images/watch.jpg",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response?.razorpay_payment_id,
                    razorpayOrderId: response?.razorpay_order_id,
                    razorpaySignature: response?.razorpay_signature,
                };

                const result = await axios.post(
                    "http://localhost:5003/api/user/order/paymentVerification",
                    data,
                    config
                );
                if (result && result?.status === 200) {
                    dispatch(
                        createAOrder({
                            totalPrice: totalAmount,
                            totalPriceAfterDiscount: totalAmount,
                            cartProductState,
                            paymentInfo: result.data,
                            shoppingInfo: formik.values,
                        })
                    );
                    dispatch(deleteUserCard());
                    dispatch(resetState());
                }
            },
            prefill: {
                name: "Quang",
                email: "quanglatoi002@gmail.com",
                contact: "0988724604",
            },
            notes: {
                address: "Thuan An",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    useEffect(() => {
        // Cal Sum
        let sum = 0;
        if (cartState?.length === 0) setTotalAmount(sum);
        for (let index = 0; index < cartState?.length; index++) {
            sum =
                sum +
                Number(cartState[index].quantity) * cartState[index].price;
            setTotalAmount(sum);
        }
    }, [cartState, dispatch]);

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
                                onSubmit={formik.handleSubmit}
                                action=""
                                className="d-flex gap-15 flex-wrap justify-content-between"
                            >
                                <div className="w-100">
                                    <select
                                        className="form-control form-select"
                                        id=""
                                        name="country"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.country}
                                    >
                                        <option value="" selected disabled>
                                            Select Country
                                        </option>
                                        <option value="Vietnam">
                                            Việt Nam
                                        </option>
                                    </select>
                                    <div className="error ms-2 my-1">
                                        {formik.touched.country &&
                                            formik.errors.country}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        placeholder="First Name"
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.firstName}
                                    />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.firstName &&
                                            formik.errors.firstName}
                                    </div>
                                </div>

                                <div className="flex-grow-1">
                                    <input
                                        placeholder="Last Name"
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        onChange={formik.handleChange(
                                            "lastName"
                                        )}
                                        onBlur={formik.handleBlur("lastName")}
                                        value={formik.values.lastName}
                                    />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.lastName &&
                                            formik.errors.lastName}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        placeholder="Address"
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.address}
                                    />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.address &&
                                            formik.errors.address}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        placeholder="Apartment, Suite, etc"
                                        type="text"
                                        className="form-control"
                                        name="other"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.other}
                                    />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.other &&
                                            formik.errors.other}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        placeholder="City"
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.city}
                                    />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.city &&
                                            formik.errors.city}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <select
                                        className="form-control form-select"
                                        id=""
                                        name="state"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.state}
                                    >
                                        <option value="" selected disabled>
                                            Select State
                                        </option>
                                        <option value="ThuanAn">Th</option>
                                    </select>
                                    <div className="error ms-2 my-1">
                                        {formik.touched.state &&
                                            formik.errors.state}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        placeholder="ZipCode"
                                        type="text"
                                        className="form-control"
                                        name="pinCode"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.pinCode}
                                    />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.pinCode &&
                                            formik.errors.pinCode}
                                    </div>
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
                                        <button
                                            className="button"
                                            type="submit"
                                        >
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            {cartState &&
                                cartState?.map((item) => (
                                    <div
                                        key={item?._id}
                                        className="d-flex gap-10 mb-2 align-items-center"
                                    >
                                        <div className="w-75 d-flex gap-10">
                                            <div className="w-25 position-relative">
                                                <span
                                                    style={{
                                                        top: "-20px",
                                                        right: "2px",
                                                    }}
                                                    className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                                                >
                                                    {item?.quantity}
                                                </span>
                                                <img
                                                    className="img-fluid"
                                                    src={
                                                        item?.productId?.images
                                                            ? item?.productId
                                                                  ?.images[0]
                                                                  ?.url
                                                            : "../images/watch.jpg"
                                                    }
                                                    alt="product"
                                                />
                                            </div>
                                            <div>
                                                <h5 className="total-price">
                                                    {item?.productId?.title}
                                                </h5>
                                                <p className="total-price">
                                                    {item?.color?.title}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="total">
                                                $ {item?.price * item?.quantity}
                                            </h5>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="total">SubTotal</p>
                                <p className="total-price">
                                    $ {totalAmount ? totalAmount : "0"}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 total">Shipping</p>
                                <p className="mb-0 total-price">$ 5</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="total">Total</h4>
                                <h5 className="total-price">
                                    $ {totalAmount ? totalAmount + 5 : "0"}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Checkout;
