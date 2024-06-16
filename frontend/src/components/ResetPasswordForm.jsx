import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./themes/Header";

const ResetPasswordForm = () => {
	const navigate = useNavigate();
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleFormSubmit = (values, { resetForm }) => {
		axios
			.post("http://localhost:9081/resetPassword", values)
			.then((response) => {
				setSuccessMessage(
					"Password reset link has been sent to your email address."
				);
				setErrorMessage("");
				resetForm();
			})
			.catch((error) => {
				setErrorMessage(
					"Failed to send password reset link. Please try again."
				);
				setSuccessMessage("");
				console.error("Error resetting password:", error);
			});
	};

	return (
		<Box m="10px">
			<Header title="" subtitle="RESET PASSWORD" />
			{successMessage && (
				<Box mt="50px">
					<Typography variant="body1" color="success">
						{successMessage}
					</Typography>
				</Box>
			)}
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
				validationSchema={validationSchema}
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
						>
							<TextField
								fullWidth
								variant="filled"
								type="email"
								label="Email"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.email}
								name="email"
								error={touched.email && Boolean(errors.email)}
								helperText={touched.email && errors.email}
								sx={{ gridColumn: "span 4" }}
							/>
						</Box>
						<br />
						<Box display="grid" color="primary" variant="contained">
							<Button type="submit" color="secondary" variant="contained">
								RESET PASSWORD
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

const validationSchema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
});

const initialValues = {
	email: "",
};

export default ResetPasswordForm;
