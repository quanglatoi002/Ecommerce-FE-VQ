import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
const OurStore = () => {
    const [grid, setGrid] = useState(4);
    const dispatch = useDispatch();
    //call API
    const productState = useSelector((state) => state?.product?.products);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);

    //Filter
    const [tag, setTag] = useState(null);
    const [category, setCategory] = useState(null);
    const [brand, setBrand] = useState(null);
    const [color, setColor] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [sort, setSort] = useState(null);

    console.log(brand);
    useEffect(() => {
        let newBrands = [];
        let category = [];
        let newTags = [];
        let newColors = [];
        for (let index = 0; index < productState.length; index++) {
            const element = productState[index];
            newBrands.push(element.brand);
            category.push(element.category);
            newTags.push(element.tags);
            newColors.push(element.color);
        }
        // lấy các phần tử ko trùng nhau
        setBrands([...new Set(newBrands)]);
        setCategories([...new Set(category)]);
        setTags([...new Set(newTags)]);
        setColors([...new Set(newColors)]);
    }, [productState]);

    useEffect(() => {
        dispatch(
            getAllProducts({ sort, tag, brand, category, minPrice, maxPrice })
        );
    }, [brand, category, dispatch, maxPrice, minPrice, sort, tag]);

    return (
        <>
            <Meta title="Our Store" />
            <BreadCrumb title="Our Store" />
            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Shop By Categories</h3>
                            <div>
                                <ul className="ps-0">
                                    {categories &&
                                        categories?.map((item, index) => (
                                            <li
                                                onClick={() =>
                                                    setCategory(item)
                                                }
                                                key={index}
                                            >
                                                {item}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Filter By</h3>
                            <div>
                                <h5 className="sub-title">Price</h5>
                                <div className="d-flex align-items-center gap-10">
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="From"
                                            onChange={(e) =>
                                                setMinPrice(e.target.value)
                                            }
                                        />
                                        <label htmlFor="floatingInput">
                                            From
                                        </label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingInput1"
                                            placeholder="To"
                                            onChange={(e) =>
                                                setMaxPrice(e.target.value)
                                            }
                                        />
                                        <label htmlFor="floatingInput1">
                                            To
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="filter-card mb-3">
                                <h3 className="sub-title">Product Tags</h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                        {tags &&
                                            tags?.map((item, index) => (
                                                <span
                                                    className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                                                    onClick={() => setTag(item)}
                                                    key={index}
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <div className=" mt-4 mb-3">
                                <h3 className="sub-title">Product Brands</h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                        {brands &&
                                            brands?.map((item, index) => (
                                                <span
                                                    className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                                                    onClick={() =>
                                                        setBrand(item)
                                                    }
                                                    key={index}
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 mb-3">
                            <h3 className="filter-title">Random Product</h3>
                            <div>
                                <div className="random-products mb-3 d-flex">
                                    <div className="w-50">
                                        <img
                                            src="images/watch.jpg"
                                            className="img-fluid"
                                            alt="watch"
                                        />
                                    </div>
                                    <div className="w-50">
                                        <h5>
                                            Kids headphones bulk 10 pack multi
                                            colored for students
                                        </h5>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={"4"}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <b className="price">$ 300</b>
                                    </div>
                                </div>
                                <div className="random-products d-flex">
                                    <div className="w-50">
                                        <img
                                            src="images/watch.jpg"
                                            className="img-fluid"
                                            alt="watch"
                                        />
                                    </div>
                                    <div className="w-50">
                                        <h5>
                                            Kids headphones bulk 10 pack multi
                                            colored for students
                                        </h5>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={"4"}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <b className="price">$ 300</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="filter-sort-grid mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-10">
                                    <p className="mb-0 w-100">Sort By:</p>
                                    <select
                                        name=""
                                        className="form-control form-select"
                                        id=""
                                        onChange={(e) =>
                                            setSort(e.target.value)
                                        }
                                    >
                                        <option value="title">
                                            Alphabetically, A-Z
                                        </option>
                                        <option value="-title">
                                            Alphabetically, Z-A
                                        </option>
                                        <option value="price">
                                            Price, low to high
                                        </option>
                                        <option value="-price">
                                            Price, high to low
                                        </option>
                                        <option value="createdAt">
                                            CreatedAt, low to high
                                        </option>
                                        <option value="-createdAt">
                                            CreatedAt, high to low
                                        </option>
                                    </select>
                                </div>
                                <div className="d-flex align-items-center gap-10 grid">
                                    <p className="total-products mb-0">
                                        21 Products
                                    </p>
                                    <div className="d-flex gap-10 align-items-center">
                                        <img
                                            onClick={() => {
                                                setGrid(3);
                                            }}
                                            className="d-block img-fluid"
                                            src="images/gr4.svg"
                                            alt="grid"
                                        />
                                        <img
                                            onClick={() => {
                                                setGrid(4);
                                            }}
                                            className="d-block img-fluid"
                                            src="images/gr3.svg"
                                            alt="grid"
                                        />
                                        <img
                                            onClick={() => {
                                                setGrid(6);
                                            }}
                                            className="d-block img-fluid"
                                            src="images/gr2.svg"
                                            alt="grid"
                                        />

                                        <img
                                            onClick={() => {
                                                setGrid(12);
                                            }}
                                            className="d-block img-fluid"
                                            src="images/gr.svg"
                                            alt="grid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="products-list pb-5">
                            <div className="d-flex gap-10 flex-wrap">
                                <ProductCard
                                    data={productState ? productState : []}
                                    grid={grid}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default OurStore;
