import { Box, Grid, Typography } from '@mui/material'
import logo from '../assets/logo.svg'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <Grid container sx={{
            height: 359,
            bgcolor: '#000000',
            mt: 5,
        }}>
            <Grid item md={5.5} pl={5}>
                <Box
                    component={'img'}
                    src={logo}
                    alt='logo'
                    sx={{
                        width: 74,
                        height: 118,
                        mt: 3,
                    }} />
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#FFFFFF',
                    width: 416,
                    mt: 1,
                }}>
                    Where Timeless Beauty Meets Classic Wheels: Discover Your Vintage Ride Today!
                </Typography>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    width: 416,
                    mt: 4,
                }}>
                    Follow Us
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    mt: 1
                }}>
                    <FacebookIcon fontSize='large' sx={{
                        color: '#FFFFFF',
                    }} />
                    <InstagramIcon fontSize='large' sx={{
                        color: '#FFFFFF',
                    }} />
                </Box>
            </Grid>
            <Grid item md={3}>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    mt: 6,
                    mb: 5,
                }}>
                    Useful Links
                </Typography>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    mt: 2,
                    cursor: 'pointer',
                }}
                    onClick={() => navigate('/home')}
                >
                    HOME
                </Typography>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    mt: 2,
                    cursor: 'pointer',
                }}
                    onClick={() => navigate('/my-bids')}
                >
                    MY BIDS
                </Typography>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    mt: 2,
                    cursor: 'pointer',
                }}
                    onClick={() => navigate('/sell')}
                >
                    SELL
                </Typography>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    mt: 2,
                    cursor: 'pointer',
                }}
                    onClick={() => navigate('/contact')}
                >
                    CONTACT
                </Typography>
            </Grid>
            <Grid item md={3.5} >
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    mt: 6,
                    // mb: 5,
                }}>
                    Contact Us
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mt: 4,
                }}>
                    <CallIcon sx={{
                        color: '#FFFFFF',
                    }} />
                    <Typography sx={{
                        fontFamily: 'poppins',
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#FFFFFF',
                        width: 416,
                    }}>
                        +94 786 898 765
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mt: 2,
                }}>
                    <EmailIcon sx={{
                        color: '#FFFFFF',
                    }} />
                    <Typography sx={{
                        fontFamily: 'poppins',
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#FFFFFF',
                        width: 416,
                    }}>
                        Gear123@gmail.com
                    </Typography>
                </Box>
                <Box sx={{
                    width: 289,
                    height: 35,
                    borderRadius: '5px',
                    bgcolor: '#FFFFFF',
                    mt: 6.5
                }}>
                    <SendRoundedIcon sx={{
                        color: '#000000',
                        mt: 0.7,
                        ml: 32,
                    }} />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Footer