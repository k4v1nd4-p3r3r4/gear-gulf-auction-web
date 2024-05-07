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
import login from "../../assets/login.png";
import logo from "../../assets/logo.svg";
import { signIn } from "../../services/ApiService";
import { useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { register, watch } = useForm();

  const handleSignIn = async () => {
    const formData = watch();

    // Get current date and time
    const currentDate = new Date();

    // Format date and time as desired (in this case, YYYY-MM-DD HH:MM:SS)
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const data = {
      email: formData.email,
      password: formData.password,
      date: formattedDate,
    };
    const response = await signIn(data);
    if (response.status === "200") {
      console.log("Sign In Success");

      // Save User Details to Local Storage
      {
        localStorage.setItem("userId", response.user.userId);
        localStorage.setItem("userName", response.user.userName);
        localStorage.setItem("email", response.user.email);
      }

      // Navigate to Home
      navigate("/home");
    } else {
      console.log("Sign In Failed :", response.message);

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
          src={login}
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
          py: 2,
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
          Log In
        </Typography>
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: 15,
            fontWeight: 500,
            color: "#757575",
          }}
        >
          Bid Smart, Bid Secure: Access Your Auction Account Today - Your
          Gateway to Exclusive Deals and Rare Finds!
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
        <Box
          sx={{
            display: "flex",
            mt: 1,
            width: "105.3%",
          }}
        >
          <Box
            sx={{
              width: 25,
              height: 25,
              bgcolor: "#EFEFEF",
              borderRadius: "5px",
            }}
          />
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: 16,
              fontWeight: 500,
              color: "#757575",
              ml: 1,
            }}
          >
            Remember me
          </Typography>
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: 16,
              fontWeight: 500,
              color: "#6600B5",
              ml: "auto",
            }}
          >
            Forgot Password
          </Typography>
        </Box>
        {/* <Button onClick={() => (navigate('/sign-up'))}>Signup</Button> */}
        <Button
          onClick={handleSignIn}
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
          LOGIN
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
          Don’t have an account ?{" "}
          <span
            onClick={() => navigate("/sign-up")}
            style={{
              color: "#6600B5",
              cursor: "pointer",
            }}
          >
            Register Now
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

export default Login;
