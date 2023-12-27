import React, { memo, useEffect, useState } from "react";
import Container from "./Container";
import { Link, useNavigate } from "react-router-dom";

const HomeInfo = ({ data }) => {
    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        const category = data?.map((item, index) => item.category);
        const uniqueCategories = [...new Set(category)];

        const items = uniqueCategories?.map((category) =>
            data.find((item) => item.category === category)
        );
        setCategoryItems(items);
    }, [data]);

    return (
        <>
            <Container class1="home-wrapper-2 py-lg-5 py-3">
                <div className="row">
                    <div className="col-12">
                        <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                            {categoryItems?.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex gap align-items-center justify-content-center"
                                >
                                    <Link
                                        to={`/product?category=${item.category}&&`}
                                    >
                                        <img
                                            src={item.images[0].url}
                                            alt="camera"
                                            height={110}
                                            width={110}
                                        />
                                    </Link>
                                </div>
                            ))}
                            <div className="d-flex gap align-items-center justify-content-center">
                                <img src="images/acc.jpg" alt="camera" />
                            </div>
                            <div className="d-flex gap align-items-center justify-content-center">
                                <img src="images/camera.jpg" alt="camera" />
                            </div>
                            <div className="d-flex gap align-items-center justify-content-center">
                                <img
                                    src="../images/homeapp.jpg"
                                    alt="homeapp"
                                />
                            </div>
                            <div className="d-flex gap-30 align-items-center justify-content-center">
                                <img src="../images/speaker.jpg" alt="camera" />
                            </div>
                            <div className="d-flex gap-30 align-items-center justify-content-center">
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
