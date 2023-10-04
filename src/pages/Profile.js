import React, { useState } from "react";
import { BreadCrumb } from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

let profileSchema = yup.object({
    firstname: yup.string().required("First Name is Required"),
    lastname: yup.string().required("Last Name  is Required"),
    email: yup
        .string()
        .email("Email should be valid")
        .required("Email Address is Required"),
    mobile: yup.string().required("Mobile is Required"),
});

const Profile = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.auth?.user);
    const [edit, setEdit] = useState(true);

    const formik = useFormik({
        initialValues: {
            firstname: userState?.firstname,
            lastname: userState?.lastname,
            email: userState?.email,
            mobile: userState?.mobile,
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            dispatch(updateProfile(values));
            setEdit(true);
        },
    });
    return (
        <>
            <BreadCrumb title="My Profile" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="my-3">Update Profile</h3>
                            <FiEdit
                                className="fs-3"
                                onClick={() => setEdit(false)}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label
                                    htmlFor="example1"
                                    className="form-label"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="example1"
                                    name="firstname"
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange("firstname")}
                                    onBlur={formik.handleBlur("firstname")}
                                    disabled={edit}
                                />
                                <div className="error">
                                    {formik.touched.firstname &&
                                        formik.errors.firstname}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="example1"
                                    className="form-label"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="example1"
                                    name="lastname"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange("lastname")}
                                    onBlur={formik.handleBlur("lastname")}
                                    disabled={edit}
                                />
                                <div className="error">
                                    {formik.touched.lastname &&
                                        formik.errors.lastname}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                    disabled={edit}
                                />
                                <div className="error">
                                    {formik.touched.email &&
                                        formik.errors.email}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label"
                                >
                                    Mobile No
                                </label>
                                <input
                                    type="mobile"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    name="mobile"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                    disabled
                                />
                                <div className="error">
                                    {formik.touched.mobile &&
                                        formik.errors.mobile}
                                </div>
                            </div>
                            {edit === false && (
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Profile;
