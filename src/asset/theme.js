import {createTheme} from "@mui/material/styles";
import {green, purple} from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const theme = createTheme({

});

export const diyTheme = createTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: green[500],
        },
    },
});