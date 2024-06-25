import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

import heroImg from "../assests/heroimg.jpg";

const Hero = () => {
	const CustomBox = styled(Box)(({ theme }) => ({
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: theme.spacing(35),

		// [theme.breakpoints.down("md")]: {
		//   flexDirection: "column",
		//   alignItems: "space-around",
		//   textAlign: "center",
		// },
	}));

	const Title = styled(Typography)(({ theme }) => ({
		fontSize: "25px",
		color: "#000336",
		fontWeight: "bold",
		margin: theme.spacing(4, 0, 4, 0),
		[theme.breakpoints.down("sm")]: {
			fontSize: "40px",
		},
	}));

	return (
		<Box sx={{ backgroundColor: "#E6F0FF", height: "300" }}>
			<Container>
				<CustomBox>
					<Box sx={{ flex: "1" }}>
						<Typography
							variant="body2"
							sx={{
								fontSize: "18px",
								color: "#687690",
								fontWeight: "500",
								mt: 10,
								mb: 4,
							}}
						>
							Welcome to BIDCIRCLE
						</Typography>
						<Title variant="h5">Your Trusted Online Auction Site</Title>

						<Typography
							variant="body2"
							sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
						>
							Where every bid is backed by our unwavering commitment to
							trustworthiness and authenticity.
						</Typography>
					</Box>

					<Box sx={{ flex: "1" }}>
						<img src={heroImg} alt="heroImg" style={{ height: "300px" }} />
					</Box>
				</CustomBox>
			</Container>
		</Box>
	);
};

export default Hero;
