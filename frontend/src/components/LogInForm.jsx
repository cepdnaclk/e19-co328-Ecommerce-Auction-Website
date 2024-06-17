import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import UseAuth from "./hooks/UseAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "./themes/Header";
import { blue } from "@mui/material/colors";
import LoginService from "../services/LoginServices";

const LogInForm = () => {
  const { auth, setAuth } = UseAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();
  const colorblue = blue[900];

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    LoginService.login(values)
      .then((response) => {
        const accessToken = response.accessToken;
        const roles = response.roles;
        const name = response.userName;

        setAuth({ userName: name, roles: roles, accessToken: accessToken });
        const currentURL = window.location.href;
        const parts = from.split("/");
        const login = parts[1];
        console.log(response.companyName);
        const convertedRole = roles.substring(5).toLowerCase();
        const capitalRole =
          convertedRole.charAt(0).toUpperCase() + convertedRole.slice(1);
        if (convertedRole !== login) {
          setErrorMessage(
            capitalRole + " don't have access to " + login + " content"
          );
        }
        if (accessToken !== "") {
          if (roles === "ROLE_SELLER") {
            navigate("/seller/dashboard");
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        setErrorMessage("Invalid username or email address");
        console.log(error);
      });

    resetForm();
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Box m="10px">
      <Header title="" subtitle="LOGIN" />

      {errorMessage && (
        <Box mt="50px">
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        </Box>
      )}

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={touched.userName && Boolean(errors.userName)}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Typography
                component={Link}
                to="/changePassword"
                color="secondary"
                variant="body2"
              >
                Forgot Password?
              </Typography>
            </Box>

            <Box mt={3} display="flex" flexDirection="column" alignItems="center" >
              <Button type="submit" color="secondary" variant="contained" fullWidth="true">
                LOGIN
              </Button>
              <Typography mt={2} mb={2} variant="body1">
                Or
              </Typography>
              <Button
                component={Link}
                to="/signup"
                color="secondary"
                variant="contained"
				fullWidth="true"
				onClick={handleSignUp}
              >
                SIGN UP
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  userName: yup.string().required("User Name is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  userName: "",
  password: "",
};

export default LogInForm;
