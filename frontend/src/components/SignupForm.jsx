
import React from 'react'
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import UseAuth from './hooks/UseAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from './themes/Header';
import { blue } from '@mui/material/colors';
import CustomerService from '../services/CustomerService';



const SignupForm = () => {
    const { setAuth } = UseAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const navigate = useNavigate();
  const colorblue = blue[900];

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleFormSubmit = (values, {resetForm}) => {
    console.log(values);
    CustomerService.save(values)
    .then((response)=>{
        console.log(response);
        setSuccessMessage("Verification link has been sent to your email")
        navigate('/login');
    }).catch((error)=>{
        setErrorMessage("Invalid username or email address")
        console.log(error);
    })
    
      resetForm();
  };

  const handleLogIn = () => {
    navigate('/login');
  };
  
  return (
    <Box m="10px">
      <Header title="" subtitle="SIGNUP" />
      
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
                error={touched.userName && errors.userName}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
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
                error={touched.password && errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              
              
              
              
              
            </Box><br/>
            {/* <Box display="grid" color="primary" variant="contained">
              <Button type="submit" color='secondary' variant='contained' >
            
                SignUp
              </Button>
            </Box> */}
            <Box mt={3} display="flex" flexDirection="column" alignItems="center" >
              <Button type="submit" color="secondary" variant="contained" fullWidth="true">
                SIGN UP
              </Button>
              <Typography mt={2} mb={2} variant="body1">
                Or
              </Typography>
              <Button
                component={Link}
                to="/login"
                color="secondary"
                variant="contained"
                fullWidth="true"
                onClick={handleLogIn}
                      >
                LOGIN
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
    email: yup.string().required("Email is required")
 
  
});
const initialValues = {
   
    userName: "",
    password: "",
    email: "",
    roles: "ROLE_USER"
    
};

export default SignupForm