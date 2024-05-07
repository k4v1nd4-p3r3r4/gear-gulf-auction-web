import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import signup from "../../assets/signup.png";
import logo from "../../assets/logo.svg";
import { signUp } from "../../services/ApiService";
import { useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Signup = () => {
  const navigate = useNavigate();
  const { register, watch } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSignUp = async () => {
    const formData = watch();

    // Data to Send
    const data = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
    };
    const response = await signUp(data);
    if (response.status === "200") {
      console.log("Sign Up Success");

      // Navigate to Log In
      navigate("/log-in");
    } else {
      console.log("Sign Up Failed :", response.message);

      // Show Error Alert
      setAlertMessage(response.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <Grid container>
      <Grid
        item
        xs={6}
        height={"100vh"}
        sx={{
          bgcolor: "rgba(208, 201, 249, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={"img"}
          src={signup}
          sx={{
            width: 510,
            height: 560,
          }}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 10,
          mt: -1,
          // py: 2,
          // justifyContent: 'center',
          // alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Box
            component={"img"}
            src={logo}
            sx={{
              width: 86,
              height: 145,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: 15,
                fontWeight: "bold",
                mt: "auto",
              }}
            >
              Gear Gulf
            </Typography>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: 10,
                fontWeight: "bold",
                opacity: "50%",
              }}
            >
              Auction Cars
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: 50,
            lineHeight: "75px",
            fontWeight: 600,
          }}
        >
          Sign Up
        </Typography>
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: 15,
            fontWeight: 500,
            color: "#757575",
          }}
        >
          Join the Excitement: Sign Up Now to Unlock Exclusive Access to
          Auctions, Deals, and Rare Finds.
          <span style={{ color: "#6600B5" }}> Start Your Journey Today!</span>
        </Typography>
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: 16,
            fontWeight: 500,
            color: "#757575",
            mt: 3,
          }}
        >
          Enter Your Name
        </Typography>
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          {...register("userName", { required: true })}
          sx={{
            width: "100%",
            height: 40,
            px: 2,
            borderRadius: "5px",
            fontFamily: "poppins",
            bgcolor: "#EFEFEF",
            "& .MuiInputBase-root": {
              height: 40,
            },
          }}
        />
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: 16,
            fontWeight: 500,
            color: "#757575",
            mt: 1,
          }}
        >
          Enter Your Password
        </Typography>
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          {...register("password", { required: true })}
          sx={{
            width: "100%",
            height: 40,
            px: 2,
            borderRadius: "5px",
            fontFamily: "poppins",
            bgcolor: "#EFEFEF",
            "& .MuiInputBase-root": {
              height: 40,
            },
          }}
        />
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: 16,
            fontWeight: 500,
            color: "#757575",
            mt: 1,
          }}
        >
          Enter Your Email
        </Typography>
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          {...register("email", { required: true })}
          sx={{
            width: "100%",
            height: 40,
            px: 2,
            borderRadius: "5px",
            fontFamily: "poppins",
            bgcolor: "#EFEFEF",
            "& .MuiInputBase-root": {
              height: 40,
            },
          }}
        />
        <Button
          onClick={handleSignUp}
          variant="contained"
          sx={{
            width: "105.3%",
            height: 50,
            mt: 4,
            borderRadius: "5px",
            bgcolor: "#6600B5",
            fontFamily: "poppins",
            fontSize: 20,
            fontWeight: 600,
            ":hover": {
              bgcolor: "#6600B5",
            },
          }}
        >
          SIGNUP
        </Button>
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: 12,
            fontWeight: 500,
            textAlign: "center",
            mt: 1,
            width: "105.3%",
          }}
        >
          Already have an account ?{" "}
          <span
            onClick={() => navigate("/log-in")}
            style={{
              color: "#6600B5",
              cursor: "pointer",
            }}
          >
            Login Now
          </span>
        </Typography>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default Signup;
