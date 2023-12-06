import { ThreeCircles } from "react-loader-spinner";
import { memo } from "react";

const AudioCircles = () => {
    return (
        <ThreeCircles
            height="100"
            width="100"
            color="#0F8080"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            strokeWidth="5"
            animationDuration="0.5"
        />
    );
};

export default memo(AudioCircles);

//pthuc van chuyen cu
// function Shipping() {
//     this.request = function (zipStart, zipEnd, weight) {
//         return "$50";
//     };
// }
// //pthuc thanh toán mới
// function AdvancedShipping() {
//     this.login = function (credentials) {}; //info shipping
//     this.setStart = function (start) {};
//     this.setDestination = function (destination) {};
//     this.calculate = function (weight) {
//         return "$40";
//     };
// }
// //adapter giúp tương thích với shipping cũ và mới, ko thay đổi về cấu trúc gọi API
// function ShippingAdapter(credentials) {
//     //khởi tạo đối tượng
//     var shipping = new AdvancedShipping();
//     // chuyển info shipping mới cho pthuc shipping mới
//     shipping.login(credentials);
//     return {
//         request: function (zipStart, zipEnd, weight) {
//             shipping.setStart = zipStart;
//             shipping.setDestination = zipEnd;
//             return (shipping.calculate = weight);
//         },
//     };
// }

// function run() {
//     var shipping = new Shipping();
//     var credentials = { token: "qqqqq" };
//     var adapter = new ShippingAdapter(credentials);

//     var cost = shipping.request("777", "88", "99");
//     cost = adapter.request("777", "888", "999");
// }
