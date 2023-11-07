import { v4 as uuidv4 } from "uuid";

const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;
console.log(getTokenFromLocalStorage);
export const config = {
    headers: {
        Authorization: `Bearer ${
            getTokenFromLocalStorage !== null
                ? getTokenFromLocalStorage?.token
                : ""
        }`,
        Accept: "application/json",
    },
};

//idv4
function generateNonce() {
    return uuidv4();
}
// lấy time hiện tại và chuyển sang giây
function generateTimestamp() {
    return Math.floor(Date.now() / 1000);
}

const nonce = generateNonce();
const timestamp = generateTimestamp();

export const config1 = {
    headers: {
        Authorization: `Bearer ${
            getTokenFromLocalStorage !== null
                ? getTokenFromLocalStorage?.token
                : ""
        }`,
        Accept: "application/json",
        "x-nonce": nonce,
        "x-timestamp": timestamp,
    },
};

export const isJsonString = (data) => {
    try {
        JSON.parse(data);
        return true;
    } catch (error) {
        return false;
    }
};
