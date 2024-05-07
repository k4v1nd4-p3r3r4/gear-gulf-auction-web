import { Box, Grid } from '@mui/material'
import { Outlet } from "react-router-dom";
import Appbar from '../Components/Appbar';
import Footer from '../Components/Footer';
import { useState } from 'react';

const Layout = () => {
    const [selectedHeader, setSelectedHeader] = useState('HOME');

    return (
        <Box sx={{
            backgroundImage: selectedHeader === 'HOME'
                ? 'linear-gradient(to right, rgba(208, 201, 249, 0.5) 70%, #6600B5 30%)'
                : (selectedHeader === 'SELL' || selectedHeader === 'MY BIDS')
                    ? 'unset'
                    : 'linear-gradient(60deg, rgba(102, 0, 181, 0.5) 30%, white 30%)',
            // backgroundImage: selectedHeader === 'CONTACT'
            //     ? 'linear-gradient(60deg, rgba(102, 0, 181, 0.5) 30%, white 30%)'
            //     : (selectedHeader === 'SELL' || selectedHeader === 'MY BIDS')
            //         ? 'unset'
            //         : 'linear-gradient(to right, rgba(208, 201, 249, 0.5) 70%, #6600B5 30%)',
            height: '100vh',
            position: 'relative'
        }}>
            <Appbar selectedHeader={selectedHeader} setSelectedHeader={setSelectedHeader} />
            <Outlet />
            <Footer />
        </Box>
    )
}

export default Layout