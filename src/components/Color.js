import React, { memo } from "react";

const Color = (props) => {
    const { colorData, setColor } = props;
    return (
        <>
            <ul className="colors ps-0">
                {colorData &&
                    colorData?.map((item) => (
                        <li
                            onClick={() => setColor(item?._id)}
                            style={{ backgroundColor: item?.title }}
                            key={item?._id}
                        ></li>
                    ))}
            </ul>
        </>
    );
};

export default memo(Color);
