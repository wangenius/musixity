import {Outlet} from "react-router-dom";
import Box from "@mui/material/Box";



export default function Login() {

    return (
        <Box className={"logPanel"}>
            <Outlet/>
        </Box>
    );
}