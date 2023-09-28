/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { BreadCrumb } from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";

let contactSchema = yup.object({
    name: yup.string().required("Name is Required"),
    email: yup
        .string()
        .nullable()
        .email("Email should be valid")
        .required("Email Address is Required"),
    mobile: yup.string().default("").nullable().required("Mobile is Required"),
    comment: yup
        .string()
        .default("")
        .nullable()
        .required("Comment is Required"),
});

const Contact = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            comment: "",
        },
        validationSchema: contactSchema,
        onSubmit: (values) => {
            console.log(values);
            dispatch(createQuery(values));
        },
    });
    return (
        <>
            <Meta title={"Contact Us"} />
            <BreadCrumb title="Contact Us" />
            <Container class1="contact-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15667.425710831065!2d106.66806085718125!3d10.974207692386436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1ab21e082af%3A0x2f97d7d8f0e52d64!2sThe%20Cup%20Cafe%20-%20Biconsi%20Ph%C3%BA%20H%C3%B2a!5e0!3m2!1svi!2s!4v1694668323534!5m2!1svi!2s"
                            width="600"
                            height="450"
                            className="border-0 w-100"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="col-12 mt-5">
                        <div className="contact-inner-wrapper d-flex justify-content-between">
                            <div>
                                <h3 className="contact-title mb-4">Contact</h3>
                                <form
                                    onSubmit={formik.handleSubmit}
                                    className="d-flex flex-column gap-15"
                                    action=""
                                >
                                    <div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            name="name"
                                            onChange={formik.handleChange(
                                                "name"
                                            )}
                                            onBlur={formik.handleBlur("name")}
                                            value={formik.values.name}
                                        />
                                        <div className="error">
                                            {formik.touched.name &&
                                                formik.errors.name}
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            name="email"
                                            onChange={formik.handleChange(
                                                "email"
                                            )}
                                            onBlur={formik.handleBlur("email")}
                                            value={formik.values.email}
                                        />
                                        <div className="error">
                                            {formik.touched.email &&
                                                formik.errors.email}
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Mobile Number"
                                            name="mobile"
                                            onChange={formik.handleChange(
                                                "mobile"
                                            )}
                                            onBlur={formik.handleBlur("mobile")}
                                            value={formik.values.mobile}
                                        />
                                        <div className="error">
                                            {formik.touched.mobile &&
                                                formik.errors.mobile}
                                        </div>
                                    </div>
                                    <div>
                                        <textarea
                                            className="w-100 form-control"
                                            id=""
                                            cols={30}
                                            rows={10}
                                            placeholder="Comments"
                                            name="comment"
                                            onChange={formik.handleChange(
                                                "comment"
                                            )}
                                            onBlur={formik.handleBlur(
                                                "comment"
                                            )}
                                            value={formik.values.comment}
                                        ></textarea>
                                        <div className="error">
                                            {formik.touched.comment &&
                                                formik.errors.comment}
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="button border-0"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <h3 className="contact-title mb-4">
                                    Get in touch with us
                                </h3>
                                <div>
                                    <ul className="ps-0">
                                        <li className="mb-3 d-flex gap-15 align-items-center">
                                            <AiOutlineHome className="fs-5" />
                                            <address className="mb-0">
                                                Phu Hoa, Thu Dau Mot
                                            </address>
                                        </li>
                                        <li className="mb-3 d-flex gap-15 align-items-center">
                                            <BiPhoneCall className="fs-5" />
                                            <a href="tel: +84 988724604">
                                                +84 988724604
                                            </a>
                                        </li>
                                        <li className="mb-3 d-flex gap-15 align-items-center">
                                            <AiOutlineMail className="fs-5" />
                                            <a href="mailto:quanglatoi002@gmail.com">
                                                quanglatoi002@gmail.com
                                            </a>
                                        </li>
                                        <li className="mb-3 d-flex gap-15 align-items-center">
                                            <BiInfoCircle className="fs-5" />
                                            <p className="mb-0">
                                                Monday - Friday 10 AM - 8 PM
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Contact;
