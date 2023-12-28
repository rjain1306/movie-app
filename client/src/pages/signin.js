import React from "react";
import { Box, Typography, Checkbox, Button, FormControlLabel, useMediaQuery } from "@mui/material";
import Layout from "../components/layout";
import InputTextField from "../components/inputTextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import "./styles/signin.css";

const SignIn = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const validationSchema = yup.object({
    email: yup.string().email("Please enter the valid email").required("Please enter the email"),
    password: yup.string().required("Please enter the password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // You can perform login logic here
      console.log("Login data:", values);
      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: "10px",
          margin: isMobile ? "20px" : "0px",
        },
      });
      navigate("/movie/list");
    },
  });

  return (
    <Layout>
      <Box className="signin-container">
        <Typography variant="h2" className="signin-title" gutterBottom>
          Sign in
        </Typography>
        <form onSubmit={formik.handleSubmit} className="form-container">
          <InputTextField
            placeholder="Email"
            type="email"
            size="small"
            required
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography className="error-message" textAlign={"left"}>
              {formik.errors.email}
            </Typography>
          )}
          <InputTextField
            placeholder="Password"
            type="password"
            size="small"
            required
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <Typography className="error-message">{formik.errors.password}</Typography>
          )}
          <FormControlLabel
            control={<Checkbox sx={checkBoxStyles} {...formik.getFieldProps("rememberMe")} />}
            className="form-control"
            label={<span className="form-control-label">Remember me</span>}
          />
          <Button type="submit" variant="contained" sx={buttonStyle} className="button">
            Login
          </Button>
          <Typography className="login-text">
            Don't have an account ?{" "}
            <a className="link" href="/sign-up">
              Sign up
            </a>
          </Typography>
        </form>
      </Box>
    </Layout>
  );
};

export default SignIn;

const checkBoxStyles = {
  color: "transparent",
  background: "#224957",
  width: 20,
  height: 20,
  borderRadius: "5px",
  marginRight: "10px",
};

const buttonStyle = {
  color: "white",
  textTransform: "none",
  marginTop: "10px",
  fontWeight: 700,
  borderRadius: "10px",
};
