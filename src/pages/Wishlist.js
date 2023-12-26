import React, { useEffect } from "react";
import { BreadCrumb } from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishList } from "../features/user/userSlice";
import { addToWishList } from "../features/products/productSlice";

const Wishlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProductWishList());
    }, [dispatch]);
    const wishListState = useSelector(
        (state) => state?.auth?.wishList?.wishlist
    );

    const removeFromWishList = (id) => {
        dispatch(addToWishList(id));
        setTimeout(() => {
            dispatch(getUserProductWishList());
        }, 50);
    };

    return (
        <>
            <Meta title={"Wishlist"} />
            <BreadCrumb title="Wishlist" />
            <Container class1="wishlist-wrapper home-wrapper-2 py-5">
                <div className="row">
                    {wishListState?.length === 0 && (
                        <div className="text-center fs-3"> No Data </div>
                    )}
                    {wishListState?.map((item) => (
                        <div key={item?._id} className="col-3">
                            <div className="wishlist-card position-relative">
                                <img
                                    onClick={() =>
                                        removeFromWishList(item?._id)
                                    }
                                    src="images/cross.svg"
                                    alt="cross"
                                    className="position-absolute cross img-fluid"
                                />
                                <div className="wishlist-cart-image bg-white">
                                    <img
                                        src={
                                            item?.images[0].url
                                                ? item?.images[0].url
                                                : "../images/watch.jpg"
                                        }
                                        alt="watch"
                                        className="img-fluid w-100"
                                    />
                                </div>
                                <div className="py-3">
                                    <h5 className="title">{item?.title}</h5>
                                    <h6 className="price"> $ {item?.price}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default Wishlist;
