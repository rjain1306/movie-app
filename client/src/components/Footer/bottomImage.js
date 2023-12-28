import React from "react";
import bottomImage from "../../assets/images/main_lower_background.png";

const BottomImage = () => {
  const bottomImageStyle = {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    height: "111px",
  };

  return <img src={bottomImage} alt="Bottom" style={bottomImageStyle} />;
};

export default BottomImage;
