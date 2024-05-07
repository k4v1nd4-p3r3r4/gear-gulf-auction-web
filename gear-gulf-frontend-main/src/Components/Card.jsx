import { Box, Button, Typography } from '@mui/material'
import car1 from '../assets/car1.png';
import BidDialog from './BidDialog';
import React, {useEffect, useState} from 'react';
import {getImage} from "../services/ApiService.js";

const Card = ({ card }) => {
    const { title, price, image, description,isButtonActive } = card
    const [open, setOpen] = useState(false);
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

    return (
        <>
            <BidDialog card={card} image={imageUrl} open={open} setOpen={setOpen} />
            <Box sx={{
                width: 374,
                // height: 544,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                // bgcolor: 'yellow',
            }}>
                {/*<img src={imageUrl} alt="Uploaded" style={{maxWidth: '300px'}}/>*/}
                <Box
                    component={'img'}
                    src={imageUrl || car1}
                    alt='iamge'
                    sx={{
                        width: 374,
                        height: 359,
                        borderRadius:"10px 10px 0px 0px"
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
                        Bid <span style={{fontSize: 14, color: '#6600B5'}}>Rs. {price} </span>
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
                    {isButtonActive &&
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
                            ml: 'auto',
                            mt: 2,
                        }}
                                onClick={() => (setOpen(true))}
                        >
                            Place a Bid
                        </Button>}
                </Box>
            </Box>
        </>
    )
}

export default Card