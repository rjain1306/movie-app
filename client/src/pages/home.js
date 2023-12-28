import React, { useState } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import Layout from "../components/layout";
import "./styles/home.css";
import { useNavigate } from "react-router-dom";
import ListMovie from "./Movie/List";

const Home = () => {
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const onAddMovie = () => {
    navigate("/movie/create");
  };
  return (
    <Layout>
      {isEmpty ? (
        <ListMovie />
      ) : (
        <Box className="container">
          <Typography variant={isMobile ? "h3" : "h2"} className="message">
            Your movie list is empty
          </Typography>
          <Button
            type="button"
            variant="contained"
            sx={buttonStyle}
            className="button"
            onClick={onAddMovie}
          >
            Add a new movie
          </Button>
        </Box>
      )}
    </Layout>
  );
};

export default Home;

const buttonStyle = {
  color: "white",
  textTransform: "none",
  marginTop: "10px",
  fontWeight: 700,
  borderRadius: "10px",
};
