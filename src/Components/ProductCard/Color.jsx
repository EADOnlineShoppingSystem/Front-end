import React from "react";

const Color = (props) => {
  const { colorData, setColor, selectedColor } = props;
  return (
    <>
      <ul className="colors ps-0">
        {colorData &&
          colorData?.map((item, index) => {
            return (
              <li
                onClick={() => setColor(item?._id)}
                style={{
                  backgroundColor: item?.title,
                  border:
                    selectedColor === item?._id ? "2px solid black" : "none",
                }}
                key={index}
              ></li>
            );
          })}
      </ul>
    </>
  );
};

export default Color;
