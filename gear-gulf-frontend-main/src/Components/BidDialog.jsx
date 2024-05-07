import { Box, Button, Dialog, DialogContent, IconButton, Snackbar, TextField, Typography } from '@mui/material'
import car1 from '../assets/car1.png';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { placeBids } from '../services/ApiService';
import { useState } from 'react';
import MuiAlert from "@mui/material/Alert";

const BidDialog = ({ card, image, open, setOpen }) => {
    const { id, title, price, description } = card
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [newPrice, setNewPrice] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const onSubmit = async () => {
        const email = localStorage.getItem('email');
        const postedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

        if (newPrice <= 0 ) return
        if (newPrice <= price) {
            setOpenSnackbar(true);
            setSeverity('error')
            setAlertMessage("please enter a higher amount")
            return
        }

        const payload = {
            email: email,
            vehicleId: id,
            bidAmount: newPrice,
            date: postedDate,
        }
        try {
            const response = await placeBids(payload)
            setOpenSnackbar(true);
            setSeverity('success')
            setAlertMessage(response.message)
            setOpen(false);
            window.location.reload();
        } catch (err) {
            console.log("error placing the bid", err);
        }
    };

    const handleNewPriceChange = (event) => {
        setNewPrice(event.target.value);
    };

    return (
        <>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MuiAlert
                    onClose={() => setOpenSnackbar(false)}
                    severity={severity}
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
            <Dialog
                maxWidth={'xl'}
                open={open}
                slotProps={{
                    backdrop: {
                        sx: {
                            background: 'rgba(0,0,0,0.4)',
                        },
                    },
                }}
            >
                <DialogContent sx={{
                    width: 845,
                    height: 400,
                    maxHeight: 700,
                    overflow: 'auto',
                    scrollbarWidth: 'none',
                    display: 'flex',
                    bgcolor: '#EBEBEB',
                    m: 5,
                    borderRadius: 2,
                    p: 0,
                }}>
                    <Box
                        component={'img'}
                        src={image || car1}
                        alt='iamge'
                        sx={{
                            width: 350,
                            height: 400,
                        }} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        p: 2,
                        width: '100%',
                    }}>
                        <IconButton
                            size='small'
                            onClick={() => (setOpen(false))}
                            sx={{
                                position: 'absolute',
                                right: { sm: 15, xs: 6 },
                                top: { sm: 15, xs: 4 },
                                bgcolor: '#FFFFFF',
                                // bgcolor: 'transparent',
                                zIndex: 1,
                            }}>
                            <CloseRoundedIcon fontSize='small' />
                        </IconButton>
                        <Typography sx={{
                            fontFamily: 'Poppins',
                            fontSize: 30,
                            fontWeight: 600,
                            textAlign: 'center',
                        }}>
                            {title}
                        </Typography>
                        <Typography sx={{
                            fontFamily: 'Poppins',
                            fontSize: 12,
                            // fontWeight: 500,
                            textAlign: 'justify',
                            lineHeight: '20px',
                            color: '#757575',
                            mt: 1,
                            width: 400,

                        }}>
                            {description}
                        </Typography>
                        <Typography sx={{
                            fontFamily: 'Poppins',
                            fontSize: 15,
                            // fontWeight: 500,
                            textAlign: 'justify',
                            lineHeight: '20px',
                            color: '#757575',
                            mt: 1,
                            width: 400,

                        }}>
                            color : <span style={{ color: '#000000' }}>Black</span>
                        </Typography>
                        <Typography sx={{
                            fontFamily: 'Poppins',
                            fontSize: 15,
                            // fontWeight: 500,
                            textAlign: 'justify',
                            lineHeight: '20px',
                            color: '#757575',
                            mt: 1,
                            width: 400,

                        }}>
                            Bid Start Price : <span style={{ color: '#000000' }}>Rs. {price}</span>
                        </Typography>
                        <Typography sx={{
                            fontFamily: 'Poppins',
                            fontSize: 15,
                            fontWeight: 500,
                            textAlign: 'justify',
                            lineHeight: '20px',
                            // color: '#757575',
                            mt: 'auto',
                            // mt: 10,
                            width: 400,
                        }}>
                            Current Bid Price : <span style={{ color: '#6600B5' }}>Rs. {price}</span>
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            pl: 3,
                            mt: 2,
                        }}>
                            <TextField
                                type='number'
                                value={newPrice}
                                onChange={handleNewPriceChange}
                                placeholder='LKR .'
                                variant="standard"
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                sx={{
                                    width: 250,
                                    height: 40,
                                    px: 2,
                                    borderRadius: "5px",
                                    fontFamily: "poppins",
                                    bgcolor: "#FFFFFF",
                                    "& .MuiInputBase-root": {
                                        height: 40,
                                    },
                                }}
                            />
                            <Button
                                onClick={onSubmit}
                                variant="contained"
                                sx={{
                                    width: 130,
                                    height: 40,
                                    borderRadius: "5px",
                                    bgcolor: "#6600B5",
                                    fontFamily: "poppins",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    ":hover": {
                                        bgcolor: "#6600B5",
                                    },
                                }}
                            >
                                Place a Bid
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default BidDialog