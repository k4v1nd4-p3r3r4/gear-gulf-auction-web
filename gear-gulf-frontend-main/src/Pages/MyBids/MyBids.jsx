import { Grid, Pagination, Typography } from '@mui/material'
import Card from '../../Components/Card'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBidsByUser } from '../../services/ApiService';

const MyBids = () => {
    const [page, setPage] = useState(1);
    const [cards, setCards] = useState(null);
    const [pagesCount, setPagesCount] = useState(0);
    const pageCount = 3

    const fetchBidsByUser = async () => {
        const data = {
            page: page - 1,
            pageCount: pageCount,
            userId : parseInt(localStorage.getItem("userId"))
        }
        try {
            const response = await getBidsByUser(data);
            console.log('bids by user:',response?.bidList.content[0].vehicle.imageName)
            const newCards = response?.bidList?.content.map(vehicle => ({
                id: vehicle.vehicle.vehicleId,
                title: vehicle.vehicle.vehicleName,
                image : vehicle.vehicle.imageName,
                description: vehicle.vehicle.description,
                price: vehicle.bidAmount,
                isButtonActive : false
            }));
            setPagesCount(response?.bidList.totalPages)
            console.log("new cards :", newCards);
            setCards(newCards);
        } catch (err) {
            console.log("error fetching vehicles", err);
        }
    }

    const handleChange = (event, value) => {
        setPage(value);
        console.log(value);
    };

    useEffect(() => {
        fetchBidsByUser()
    }, [page]);

    return (
        <>
            <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} mt={4} rowGap={6}>
                {cards != null ? cards?.map((card) => (
                    <Grid item key={card.id} md={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Card card={card} />
                    </Grid>
                )) : <Typography>You Have No Bided Yet</Typography>}
            </Grid>
            {pagesCount && <Pagination count={pagesCount}
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
            />}
        </>
    )
}

export default MyBids

// const cards = [
//     {
//         id: 1,
//         title: '1996 Jaguar Classic Car',
//         image: 'hehe',
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