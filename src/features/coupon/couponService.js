import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getCoupon = async (name) => {
    console.log(name);
    const response = await axios.post(`${base_url}coupon/coupon`, { name });
    console.log(response);
    if (response.data) return response.data;
};

export const couponService = {
    getCoupon,
};
