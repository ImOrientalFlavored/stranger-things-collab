import { createContext, useState } from "react";
import ContentPane from "../components/layout/ContentPane";
import Footer from "../components/layout/Footer";
import NavUI from "../components/layout/NavUI";
import { ColorModeContext, useMode } from "../theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from 'react-router-dom'

export const AuthContext = createContext(false);
export default function Root(){
    const [theme, colorMode] = useMode();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <ColorModeContext.Provider value={colorMode as {toggleColorMode:()=>void}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthContext.Provider value={isLoggedIn}>

                <NavUI setIsLoggedIn={setIsLoggedIn}>
                    <ContentPane>
                        <Outlet />
                    </ContentPane>
                </NavUI>
                    <Footer />
                </AuthContext.Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}