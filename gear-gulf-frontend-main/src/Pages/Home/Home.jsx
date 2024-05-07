import { Box, Button, Grid, IconButton, Pagination, Rating, Typography, colors } from '@mui/material'
import car from '../../assets/car.png'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Card from '../../Components/Card';
import car1 from '../../assets/car1.png';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Review from '../../Components/Review';
import BidDialog from '../../Components/BidDialog';
import { getVehicles } from '../../services/ApiService';

const Home = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [cards, setCards] = useState(null);
    const [pagesCount, setPagesCount] = useState(0);

    const pageCount = 3

    const handleChange = (event, value) => {
        setPage(value);
        console.log(value);
    };

    const fetchVehicles = async () => {
        const data = {
            page: page - 1,
            pageCount: pageCount,
        }
        try {
            const response = await getVehicles(data);
            console.log("home",response)
            const newCards = response.vehicles.content.map(vehicle => ({
                id: vehicle.vehicleId,
                title: vehicle.vehicleName,
                image : vehicle.imageName,
                description: vehicle.description,
                price: vehicle.bidAmount,
                isButtonActive : true
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

    return (
        <>
            <Typography sx={{
                fontFamily: 'poppins',
                fontSize: 50,
                fontWeight: 600,
                color: '#000000',
                lineHeight: '55px',
                width: 660,
                mt: 20,
                ml: 10,
            }}>
                Your Gateway to <span style={{ color: '#6600B5' }} > Classic Car Auctions</span> and Treasures !
            </Typography>
            <Typography sx={{
                fontFamily: 'poppins',
                fontSize: 20,
                fontWeight: 600,
                color: '#757575',
                lineHeight: '24px',
                width: 660,
                mt: 4,
                ml: 10,
            }}>
                Welcome to our classic car auction hub, where timeless elegance meets your passion for automotive history. Start exploring and bidding today!
            </Typography>
            <Box sx={{
                display: 'flex',
                ml: 10,
                gap: 4,
                mt: 4,
            }}>
                <Button
                    onClick={() => (navigate('/log-in'))}
                    variant='outlined'
                    sx={{
                        width: 120,
                        height: 50,
                        borderRadius: '10px',
                        border: '2px solid #6600B5',
                        color: '#6600B5',
                        fontFamily: 'poppins',
                        fontSize: 20,
                        fontWeight: 600,
                        ':hover': {
                            // border: '2px solid #6600B5',
                            bgcolor: '#6600B5',
                            color: '#FFFFFF',
                        }
                    }}
                >
                    LOGIN
                </Button>
                <Button
                    onClick={() => (navigate('/sign-up'))}
                    variant='contained'
                    sx={{
                        width: 120,
                        height: 50,
                        borderRadius: '10px',
                        // border: '2px solid #6600B5',
                        bgcolor: '#6600B5',
                        fontFamily: 'poppins',
                        fontSize: 20,
                        fontWeight: 600,
                        ':hover': {
                            bgcolor: 'transparent',
                            border: '2px solid #6600B5',
                            color: '#6600B5',
                        }
                    }}
                >
                    SIGNUP
                </Button>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                // bgcolor: 'yellow',
            }}>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 40,
                    fontWeight: 600,
                    // lineHeight: '24px',
                    mt: 20,
                    // mx: 'auto',
                }}>
                    Live Auctions
                </Typography>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 16,
                    fontWeight: 600,
                    // lineHeight: '24px',
                    color: '#757575',
                    width: 702,
                    mt: 2,
                    textAlign: 'center',
                    // mx: 'auto',
                }}>
                    Feel the Excitement, Make Your Move: Live Auctions Where Every Bid Counts, Every Win Celebrates, Every Moment Thrills
                </Typography>
                <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} mt={4} rowGap={6}>
                    {cards?.map((card) => (
                        <Grid item key={card.id} md={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Card card={card} />
                        </Grid>
                    ))}
                </Grid>
                <Pagination count={pagesCount}
                    page={page}
                    onChange={handleChange}
                    sx={{
                        mt: 4,
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
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 40,
                    fontWeight: 600,
                    // lineHeight: '24px',
                    mt: 10,
                    // mx: 'auto',
                }}>
                    What Clients Say
                </Typography>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 16,
                    fontWeight: 500,
                    // lineHeight: '24px',
                    color: '#757575',
                    width: 509,
                    mt: 2,
                    textAlign: 'center',
                    // mx: 'auto',
                }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </Typography>
                <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} my={8} >
                    <Grid item md={0.5} display={'flex'} justifyContent={'center'} alignItems={'center'} >
                        <IconButton sx={{
                            bgcolor: '#EBEBEB',
                            ":hover": {
                                bgcolor: '#6600B5',
                                opacity: '60%',
                                color: '#FFFFFF',
                            }
                        }}>
                            <ArrowBackRoundedIcon />
                        </IconButton>
                    </Grid>
                    {reviews.map((review) => (
                        <Grid key={review.id} item md={3.5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Review review={review} />
                        </Grid>
                    ))}
                    <Grid item md={0.5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <IconButton sx={{
                            bgcolor: '#EBEBEB',
                            ":hover": {
                                bgcolor: '#6600B5',
                                opacity: '60%',
                                color: '#FFFFFF',
                            }
                        }}>
                            <ArrowForwardRoundedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
            <Box
                // data-aos="fade-left"
                component={'img'}
                src={car}
                sx={{
                    width: 736,
                    height: 350,
                    ml: 5,
                    position: 'absolute',
                    top: 330,
                    right: 0,
                }}
            />
        </>
    )
}

export default Home

const reviews = [
    {
        id: 1,
        name: 'carla',
        image: 'hehe',
        rating: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio ut sem nulla pharetra diam sit amet. Morbi tristique senectus et netus et malesuada fames.'
    },
    {
        id: 2,
        name: 'carla',
        image: 'hehe',
        rating: 2,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio ut sem nulla pharetra diam sit amet. Morbi tristique senectus et netus et malesuada fames.'
    },
    {
        id: 3,
        name: 'carla',
        image: 'hehe',
        rating: 5,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio ut sem nulla pharetra diam sit amet. Morbi tristique senectus et netus et malesuada fames.'
    },
]


// const cards = [
//     {
//         id: 1,
//         title: '1996 Jaguar Classic Car',
//         image: car1,
//         price: 1200000,
//         description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
//     },
//     {
//         id: 2,
//         title: '1996 Jaguar Classic Car',
//         image: 'hehe',
//         price: 1200000,
//         description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
//     },
//     {
//         id: 3,
//         title: '1996 Jaguar Classic Car',
//         image: 'hehe',
//         price: 1200000,
//         description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
//     },
//     {
//         id: 4,
//         title: '1996 Jaguar Classic Car',
//         image: 'hehe',
//         price: 1200000,
//         description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
//     },
//     {
//         id: 5,
//         title: '1996 Jaguar Classic Car',
//         image: 'hehe',
//         price: 1200000,
//         description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
//     },
//     {
//         id: 6,
//         title: '1996 Jaguar Classic Car',
//         image: 'hehe',
//         price: 1200000,
//         description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
//     },
// ]