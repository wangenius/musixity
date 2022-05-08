import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Copyright from "../element/util/Copyright";


export default function Footer(){
    return (
        <Box
            className={"Footer"}
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                position:"absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1">
                    My sticky footer can be found here.
                </Typography>
                <Copyright />
            </Container>
        </Box>
    )
}