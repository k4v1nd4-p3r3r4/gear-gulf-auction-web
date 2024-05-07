import { Box, Button, Grid, Pagination, TextField, Typography } from '@mui/material'
import sell from '../../assets/sell.png'
import MyCard from '../../Components/MyCard'
import { useForm } from 'react-hook-form';
import {getVehiclesByUser, sellVehicle, uploadImage} from '../../services/ApiService';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Sell = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [page, setPage] = useState(1);
    const [cards, setCards] = useState(null);
    const [pagesCount, setPagesCount] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadedImageId, setUploadedImageId] = useState(null);

    const handleFileChange = async (event) => {
        setFile(event.target.files[0].name);
        const uploadedFile = event.target.files[0];
        console.log(uploadedFile);
        try {
            const formData = new FormData();
            formData.append("file", uploadedFile)

            const res = await uploadImage(formData)

            console.log(res?.imageName); // Handle the response as needed
            setUploadedImageId(res?.imageName); // Assuming the backend returns the saved image ID
        } catch (error) {
            console.error('Error uploading file:', error);
        }

    };


    const pageCount = 3

    const handleChange = (event, value) => {
        setPage(value);
        console.log(value);
    };

    const fetchVehicles = async () => {
        const data = {
            page: page - 1,
            pageCount: pageCount,
            userId: localStorage.getItem('userId'),
        }
        try {
            const response = await getVehiclesByUser(data);
            console.log("sell : ",response)
            const newCards = response.vehicles.content.map(vehicle => ({
                id: vehicle.vehicleId,
                title: vehicle.vehicleName,
                image : vehicle?.imageName,
                description: vehicle.description,
                price: vehicle.bidAmount
            }));
            setPagesCount(response.vehicles.totalPages)
            setCards(newCards);
        } catch (err) {
            console.log("error fetching vehicles", err);
        }
    }

    useEffect(() => {
        fetchVehicles();
    }, [page]);

    const onSubmit = async (data) => {
        const userId = localStorage.getItem('userId');
        const postedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const startDate = data.startDate + " 00:00:00";
        const endDate = data.endDate + " 00:00:00";

        const payload = {
            vehicleName: data.vehicleName,
            description: data.description,
            year: data.year,
            bidAmount: data.bidAmount,
            startDate: startDate,
            endDate: endDate,
            postedDate: postedDate,
            userId: userId,
            imageName : uploadedImageId
        }
        try {
            const response = await sellVehicle(payload);
            if(response.status === "200") {
                setIsSuccess(true);
                setAlertMessage(response.message);
                setOpenSnackbar(true);
                window.location.reload()
            } else {
                setAlertMessage(response.message);
                setOpenSnackbar(true);
            }
        } catch (err) {
            console.log("error selling vehicle", err);
        }
        console.log(data);
    };

    const handleSnackBarClose = () => {
        setOpenSnackbar(false);
        window.location.reload();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
                px: 10,
                py: 5,
            }}>
                <Box
                    // data-aos="fade-left"
                    component={'img'}
                    src={sell}
                    sx={{
                        width: 389,
                        height: 652,
                        ml: 5,
                        position: 'absolute',
                        top: 140,
                        right: 150,
                    }}
                />
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 30,
                    fontWeight: 600,
                    color: '#000000',
                    // lineHeight: '45px',
                    // mt: 20,
                    // ml: 10,
                }}>
                    You Can Sell Your <span style={{ color: '#6600B5' }} >  Classic Car </span> Here
                </Typography>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#757575',
                    lineHeight: '18px',
                    width: 807,
                    mt: 4,
                }}>
                    With our extensive network and online presence, your classic car will be exposed to a wide audience of potential buyers, both locally and globally. Maximize your chances of finding the right buyer who truly appreciates the value of your cherished vehicle.
                </Typography>
                <Box sx={{
                    // width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: 440,
                    bgcolor: '#EBEBEB',
                    mt: 4,
                    borderRadius: '10px',
                    px: 5,
                    py: 4,
                    gap: 1,
                }}>
                    <Typography sx={{
                        fontFamily: 'poppins',
                        fontSize: 20,
                        fontWeight: 600,
                        color: '#000000',
                        mb: 3,
                        // lineHeight: '45px',
                        // mt: 20,
                        // ml: 10,
                    }}>
                        Sell Your Classic Car
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: 3,
                        width: 633,
                        mb: 3,
                        // height: '100%',
                    }}>
                        <TextField
                            type='text'
                            placeholder='Vehicle Name *'
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            {...register("vehicleName", { required: true })}
                            sx={{
                                width: "100%",
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
                        {/* {errors.vehicleName && <span>Vehicle Name is required</span>} */}
                        <TextField
                            type='year'
                            placeholder='Year *'
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            {...register("year", { required: true })}
                            sx={{
                                width: "100%",
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
                        {/* {errors.year && <span>Year is required</span>} */}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        gap: 3,
                        width: 633,
                        mb: 3,
                        // height: '100%',
                    }}>
                        <TextField
                            type='date'
                            placeholder='Start Date *'
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            {...register("startDate", { required: true })}
                            sx={{
                                width: "100%",
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
                        {/* {errors.startDate && <span>Start Date is required</span>} */}
                        <TextField
                            type='date'
                            placeholder='End Date *'
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            {...register("endDate", { required: true })}
                            sx={{
                                width: "100%",
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
                        {/* {errors.endDate && <span>End Date is required</span>} */}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        gap: 3,
                        width: 633,
                        mb: 3,
                        // height: '100%',
                    }}>
                        <TextField
                            type='number'
                            placeholder='Bid Amount *'
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            {...register("bidAmount", { required: true })}
                            sx={{
                                width: "100%",
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
                        {/* {errors.bidAmount && <span>Bid Amount is required</span>} */}
                        <TextField
                            disabled
                            fullWidth
                            // sx={{ width: '100%',height:'20px' ,bgcolor:'#FFFFFF'}}
                            value={file}
                            InputProps={{
                                endAdornment: (
                                    <Button
                                        variant="outlined"
                                        sx={{ position: "absolute", right: 10,height:"30px" }}
                                        component="label"
                                        htmlFor="signature-file"
                                    >
                                        Upload
                                        <input
                                            type="file"
                                            id="signature-file"
                                            name="signature"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            style={{ display: "none" }}
                                        />
                                    </Button>
                                ),
                            }}
                        />
                        {/* {errors.UploadImage && <span>Upload Image is required</span>} */}
                    </Box>
                    <TextField
                        placeholder='Description *'
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        {...register("description", { required: true })}
                        sx={{
                            width: 600,
                            height: 92,
                            px: 2,
                            borderRadius: "5px",
                            fontFamily: "poppins",
                            bgcolor: "#FFFFFF",
                            "& .MuiInputBase-root": {
                                height: 40,
                            },
                        }}
                    />
                    {/* {errors.description && <span>Description is required</span>} */}
                    <Button
                        // onClick={handleSignUp}
                        type='submit'
                        variant="contained"
                        sx={{
                            width: 630,
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
                        POST
                    </Button>
                </Box>
                <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} mt={4} rowGap={6}>
                    {cards?.map((card) => (
                        <Grid item key={card.id} md={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <MyCard card={card} />
                        </Grid>
                    ))}
                </Grid>
                <Pagination count={pagesCount}
                    page={page}
                    onChange={handleChange}
                    sx={{
                        mt: 4,
                        ml: 80,
                        '& .MuiPaginationItem-root': {
                            bgcolor: '#EBEBEB',
                            ":hover": {
                                bgcolor: '#6600B5',
                                opacity: '100%',
                                color: '#FFFFFF',
                            }
                        },
                        '& .MuiPaginationItem-root.Mui-selected': {
                            bgcolor: '#6600B5',
                            opacity: '60%',
                            color: '#FFFFFF',
                            "&:hover": {
                                color: '#FFFFFF',
                                bgcolor: '#6600B5',
                                opacity: '100%',
                            }
                        },
                    }}
                />
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
            </Box>
        </form>
    )
}

export default Sell

const cards = [
    {
        id: 1,
        title: '1996 Jaguar Classic Car',
        image: 'car1',
        price: 1200000,
        description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
    },
    {
        id: 2,
        title: '1996 Jaguar Classic Car',
        image: 'hehe',
        price: 1200000,
        description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
    },
    {
        id: 3,
        title: '1996 Jaguar Classic Car',
        image: 'hehe',
        price: 1200000,
        description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
    },
]