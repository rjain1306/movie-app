import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import Layout from "../components/layout";
import InputTextField from "../components/inputTextField";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const validationSchema = yup.object({
    email: yup.string().email("Please enter the valid email").required("Please enter the email"),
    password: yup.string().required("Please enter the password"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Passwords is not matched, please enter correect password"
      )
      .required("Please enter confirm password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Signup data:", values);
      toast.success("Account created successfully, please login here", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
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
      navigate("/");
    },
  });

  return (
    <Layout>
      <Box className="signup-container">
        <Typography variant="h2" className="signup-title" gutterBottom>
          Sign up
        </Typography>
        <form onSubmit={formik.handleSubmit} className="signup-form">
          <InputTextField
            placeholder="Email"
            type="email"
            size="small"
            required
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography color="red">{formik.errors.email}</Typography>
          )}

          <InputTextField
            placeholder="Password"
            type="password"
            size="small"
            required
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <Typography color="red">{formik.errors.password}</Typography>
          )}

          <InputTextField
            placeholder="Confirm Password"
            type="password"
            size="small"
            required
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Typography color="red">{formik.errors.confirmPassword}</Typography>
          )}

          <Button type="submit" variant="contained" sx={buttonStyle} className="signup-button">
            Create an account
          </Button>
          <Typography className="login-text">
            Already have an account ?{" "}
            <a className="link" href="/">
              Login
            </a>
          </Typography>
        </form>
      </Box>
    </Layout>
  );
};

export default SignUp;

const buttonStyle = {
  color: "white",
  textTransform: "none",
  marginTop: "15px",
  fontWeight: 700,
  borderRadius: "10px",
};
