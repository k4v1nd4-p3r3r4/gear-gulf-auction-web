import { Box, Grid } from '@mui/material'
import { Outlet } from "react-router-dom";
import SideImage from '../Pages/Login/SideImage'

const LoginLayout = () => {
    return (
        <Outlet />
    )
}

export default LoginLayout