import React from "react";
import { BreadCrumb } from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    return (
        <>
            <Meta title={"Reset Password"} />
            <BreadCrumb title="Reset Password" />
            <div className="login-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3 className="text-center mb-3">
                                    Reset Password
                                </h3>
                                <form
                                    action=""
                                    className="d-flex flex-column gap-15"
                                >
                                    <div>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="mt-1">
                                        <input
                                            type="password"
                                            name="configPassword"
                                            className="form-control"
                                            placeholder="Config Password"
                                        />
                                    </div>

                                    <div>
                                        <div className="d-flex justify-content-center flex-column gap-15 align-items-center">
                                            <button
                                                className="button border-0"
                                                type="submit"
                                            >
                                                OK
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
