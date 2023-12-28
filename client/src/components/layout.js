import React from "react";
import BottomImage from "./Footer/bottomImage";

const Layout = ({ children }) => {
  return (
    <div style={backgroundStyle}>
      {children}
      <BottomImage />
    </div>
  );
};

const backgroundStyle = {
  backgroundColor: "#093545",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  position: "relative",
};

export default Layout;
