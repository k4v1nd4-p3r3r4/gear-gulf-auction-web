import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton, Typography } from '@mui/material'
import car1 from '../assets/car1.png';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {useEffect, useState} from 'react';
import {deleteVehicle, getImage} from '../services/ApiService';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const MyCard = ({ card }) => {
    const { id, title, price, image, description } = card
    const [open, setOpen] = useState();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            const res = await getImage(image)
            setImageUrl(res)
        };

        if (image) {
            fetchImage();
        }
    }, [card]);

    const handleDelete = async () => {
        const data = {
            vehicleId: id,
        }
        try {
            const response = await deleteVehicle(data);
            if(response.status === "200") {
                setIsSuccess(true);    
            }
            setAlertMessage(response.message);
            setOpenSnackbar(true);
        } catch (e) {
            console.log("error deleting", e);
        } finally {
            setOpen(false);
        }
    }

    const handleSnackBarClose = () => {
        setOpenSnackbar(false);
        window.location.reload();
    }

    return (
        <>
            <Dialog
                maxWidth={'sm'}
                open={open}
                slotProps={{
                    backdrop: {
                        sx: {
                            background: 'rgba(0,0,0,0.4)',
                        },
                    },
                }}
            >
                <DialogTitle>Are You Sure ?</DialogTitle>
                <DialogActions>
                    <Button sx={{
                        width: 120,
                        height: 35,
                        borderRadius: '7px',
                        fontFamily: 'poppins',
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#FFFFFF',
                        bgcolor: '#6600B5',
                        ':hover': {
                            color: '#FFFFFF',
                            bgcolor: '#6600B5',
                        },
                        ml: 1,
                    }}
                        onClick={() => (setOpen(false))}
                    >
                        No
                    </Button>
                    <Button sx={{
                        width: 120,
                        height: 35,
                        borderRadius: '7px',
                        fontFamily: 'poppins',
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#FFFFFF',
                        bgcolor: '#6600B5',
                        ':hover': {
                            color: '#FFFFFF',
                            bgcolor: '#6600B5',
                        },
                        ml: 1,
                    }}
                        onClick={handleDelete}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Box sx={{
                width: 374,
                // height: 544,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                // bgcolor: 'yellow',
            }}>
                <Box
                    component={'img'}
                    src={imageUrl || car1}
                    alt='iamge'
                    sx={{
                        width: 374,
                        height: 359,
                    }} />
                <Box sx={{
                    // width: '100%',
                    // height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '0px 0px 10px 10px',
                    px: 2,
                    py: 2,
                    bgcolor: '#EBEBEB'
                }}>
                    <Typography sx={{
                        fontFamily: 'poppins',
                        fontSize: 20,
                        fontWeight: 500,
                        textAlign: 'left',
                        // mx: 'auto',
                    }}>
                        {title}
                    </Typography>
                    <Typography sx={{
                        fontFamily: 'poppins',
                        fontSize: 12,
                        fontWeight: 500,
                        mt: 0.5,
                        color: '#757575',
                        textAlign: 'left',
                        // mx: 'auto',
                    }}>
                        Bid <span style={{ fontSize: 14, color: '#6600B5' }}>Rs. {price} </span>
                    </Typography>
                    <Typography sx={{
                        fontFamily: 'poppins',
                        fontSize: 10,
                        fontWeight: 500,
                        mt: 1,
                        color: '#757575',
                        textAlign: 'left',
                        // mx: 'auto',
                    }}>
                        {description}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2,
                    }}>
                        <Typography sx={{
                            fontFamily: 'poppins',
                            fontSize: 12,
                            fontWeight: 500,
                            textAlign: 'left',
                            // mx: 'auto',
                        }}>
                            Posted By Me
                        </Typography>
                        <IconButton
                            onClick={() => (setOpen(true))}
                            sx={{
                                ml: 'auto',
                            }}>
                            <DeleteRoundedIcon sx={{
                                color: '#6600B5',
                                opacity: '60%',
                            }} />
                        </IconButton>
                        {/*<Button sx={{
                            width: 120,
                            height: 35,
                            borderRadius: '7px',
                            fontFamily: 'poppins',
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#FFFFFF',
                            bgcolor: '#6600B5',
                            ':hover': {
                                color: '#FFFFFF',
                                bgcolor: '#6600B5',
                            },
                            ml: 1,
                        }}>
                            Update
                    </Button>*/}
                    </Box>
                </Box>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2500}
                onClose={handleSnackBarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MuiAlert
                    onClose={handleSnackBarClose}
                    severity= {isSuccess ? "success" : "error"}
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
        </>
    )
}

export default MyCard