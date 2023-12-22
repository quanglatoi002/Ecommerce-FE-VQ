import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProducts = async (data) => {
    const response = await axios.get(
        `${base_url}bucket/get-buckets?${
            data?.brand ? `brand=${data?.brand}&&` : ""
        }${data?.tag ? `tags=${data?.tag}&&` : ""}${
            data?.category ? `category=${data?.category}&&` : ""
        }${data?.minPrice ? `minPrice=${data?.minPrice}&&` : ""}${
            data?.maxPrice ? `maxPrice=${data?.maxPrice}&&` : ""
        }${data?.sort ? `sort=${data?.sort}&&` : ""}
        `
    );
    if (response.data) return response.data;
};

export const bucketService = {
    getProducts,
};
