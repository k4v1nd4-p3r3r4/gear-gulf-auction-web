import { Box, Button, TextField, Typography } from '@mui/material'
import contact from '../../assets/contact.png'

const Contact = () => {
  return (
    <Box>
      <Box
        component={'img'}
        src={contact}
        sx={{
          width: 673,
          height: 373,
          position: 'absolute',
          top: 280,
          left: 20,
        }}
      />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        gap: 1,
        mt: 2,
        ml: 110,
      }}>
        <Typography sx={{
          fontFamily: 'poppins',
          fontSize: 50,
          fontWeight: 600,
          // lineHeight: '24px',
          // mx: 'auto',
        }}>
          Contact Us .
        </Typography>
        <Typography sx={{
          fontFamily: 'poppins',
          fontSize: 14,
          fontWeight: 600,
          color: '#757575',
          // lineHeight: '24px',
          // mx: 'auto',
        }}>
          Contact Us if you need further assistance.
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
          // {...register("userName", { required: true })}
          sx={{
            width: "70%",
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
          // {...register("password", { required: true })}
          sx={{
            width: "70%",
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
          Message
        </Typography>
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          // {...register("password", { required: true })}
          sx={{
            width: "70%",
            height: 127,
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
          // onClick={handleSignUp}
          variant="contained"
          sx={{
            width: "75%",
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
          SUBMIT
        </Button>
      </Box>
    </Box>
  )
}

export default Contact