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
