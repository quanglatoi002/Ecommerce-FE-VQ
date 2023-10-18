import React, { useEffect } from "react";
import { BreadCrumb } from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";

let signUpSchema = yup.object({
    firstname: yup.string().required("First Name is Required"),
    lastname: yup.string().required("Last Name  is Required"),
    email: yup
        .string()
        .nullable()
        .email("Email should be valid")
        .required("Email Address is Required"),
    mobile: yup.string().required("Mobile is Required"),
    password: yup.string().required("Password is Required"),
});

const Signup = () => {
    const navigate = useNavigate();
    const authState = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            password: "",
        },
        validationSchema: signUpSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(registerUser(values));
            } catch (error) {
                console.error(error);
            }
        },
    });

    useEffect(() => {
        if (authState.createUser !== null && authState.isError === false) {
            navigate("/login");
        }
    }, [authState, navigate]);
    return (
        <>
            <Meta title={"Sign Up"} />
            <BreadCrumb title="Sign Up" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Create Account</h3>
                            <form
                                onSubmit={formik.handleSubmit}
                                action=""
                                className="d-flex flex-column gap-15"
                            >
                                <CustomInput
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange("firstname")}
                                    onBlur={formik.handleBlur("firstname")}
                                />

                                <div className="error">
                                    {formik.touched.firstname &&
                                    formik.errors.firstname ? (
                                        <div>{formik.errors.firstname}</div>
                                    ) : null}
                                </div>

                                <CustomInput
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange("lastname")}
                                    onBlur={formik.handleBlur("lastname")}
                                />

                                <div className="error">
                                    {formik.touched.lastname &&
                                    formik.errors.lastname ? (
                                        <div>{formik.errors.lastname}</div>
                                    ) : null}
                                </div>

                                <CustomInput
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />
                                <div className="error">
                                    {formik.touched.email &&
                                    formik.errors.email ? (
                                        <div>{formik.errors.email}</div>
                                    ) : null}
                                </div>

                                <CustomInput
                                    type="tel"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                />
                                <div className="error">
                                    {formik.touched.mobile &&
                                    formik.errors.mobile ? (
                                        <div>{formik.errors.mobile}</div>
                                    ) : null}
                                </div>
                                <CustomInput
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                />
                                <div className="error">
                                    {formik.touched.password &&
                                    formik.errors.password ? (
                                        <div>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <div className="d-flex justify-content-center gap-15 align-items-center">
                                        <button
                                            className="button border-0"
                                            type="submit"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Signup;
