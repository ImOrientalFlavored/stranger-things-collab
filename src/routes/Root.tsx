import Footer from "../components/layout/Footer";
import NavUI from "../components/layout/NavUI";
import { ColorModeContext, useMode } from "../theme"
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function Root(){
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <NavUI>
                    <Footer />
                </NavUI>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}