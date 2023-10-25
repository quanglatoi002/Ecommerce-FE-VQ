import React, { memo } from "react";
import Container from "./Container";
const HomeInfo = () => {
    return (
        <>
            <Container class1="home-wrapper-2 py-lg-5 py-3">
                <div className="row">
                    <div className="col-12">
                        <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                            <div className="d-flex gap align-items-center">
                                <div className="lg:d-block d-none">
                                    <h6>Music & Gaming</h6>
                                    <p>10Items</p>
                                </div>
                                <img
                                    src="../images/headphone.jpg"
                                    alt="headphone"
                                />
                            </div>
                            <div className="d-flex gap align-items-center">
                                <div className="lg:d-block d-none">
                                    <h6>Cameras</h6>
                                    <p>10Items</p>
                                </div>
                                <img src="../images/camera.jpg" alt="camera" />
                            </div>
                            <div className="d-flex gap align-items-center">
                                <div className="lg:d-block d-none">
                                    <h6>Smart Tv</h6>
                                    <p>10Items</p>
                                </div>
                                <img src="../images/tv.jpg" alt="camera" />
                            </div>
                            <div className="d-flex gap align-items-center">
                                <div className="lg:d-block d-none">
                                    <h6>Smart Watches</h6>
                                    <p>10Items</p>
                                </div>
                                <img src="images/acc.jpg" alt="camera" />
                            </div>
                            <div className="d-flex gap align-items-center">
                                <div className="lg:d-block d-none">
                                    <h6>Music & Gaming</h6>
                                    <p>10Items</p>
                                </div>
                                <img src="images/camera.jpg" alt="camera" />
                            </div>
                            <div className="d-flex gap align-items-center">
                                <div className="lg:d-block d-none">
                                    <h6>HomeApp</h6>
                                    <p>10Items</p>
                                </div>
                                <img
                                    src="../images/homeapp.jpg"
                                    alt="homeapp"
                                />
                            </div>
                            <div className="d-flex gap-30 align-items-center">
                                <div className="lg:d-block d-none">
                                    <h6>Speaker</h6>
                                    <p>10Items</p>
                                </div>
                                <img src="../images/speaker.jpg" alt="camera" />
                            </div>
                            <div className="d-flex gap-30 align-items-center">
                                <div className="lg:d-block d-none">
                                    <h6>Laptop</h6>
                                    <p>10Items</p>
                                </div>
                                <img src="images/laptop.jpg" alt="camera" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default memo(HomeInfo);
