import { createContext, useState } from "react";
import ContentPane from "../components/layout/ContentPane";
import Footer from "../components/layout/Footer";
import NavUI from "../components/layout/NavUI";
import { ColorModeContext, useMode } from "../theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet, useLoaderData } from 'react-router-dom'
import { Theme } from "@emotion/react";
import { getLocalToken, getLocalUser } from "../api";

export const loader = async () => {
    const cachedToken = getLocalToken();
    const cachedUser = getLocalUser();
    return { cachedToken, cachedUser};
}

export const AuthContext = createContext(false);
export default function Root(){

    const {cachedToken, cachedUser} = useLoaderData() as {
        cachedToken:string, 
        cachedUser :string
    };
    let defaultAuth, defaultLogin = false;
    
    if(cachedToken && cachedUser){
       defaultAuth = true;
       defaultLogin = true
    }

    const [theme, colorMode] = useMode();
    const [isLoggedIn, setIsLoggedIn] = useState(defaultLogin);
    const [token, setToken] = useState('')
    const [user, setUser] = useState('')
    const [isAuth, setIsAuth] = useState(defaultAuth)
    const userContextObj = {
        userState: [user, setUser],
        tokenState: [token, setToken],
        authState: [isAuth, setIsAuth],
        loginState: [isLoggedIn, setIsLoggedIn]
    }
  

    return (
        <ColorModeContext.Provider value={colorMode as {toggleColorMode:()=>void}}>
            <ThemeProvider theme={theme as unknown as Partial<Theme>}>
                <CssBaseline />
                <AuthContext.Provider value={isLoggedIn}>
                <NavUI setIsLoggedIn={setIsLoggedIn}>
                    <main>
                        <ContentPane>
                            <Outlet context={userContextObj} />
                        </ContentPane>
                    </main>
                </NavUI>
                    <Footer />
                </AuthContext.Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}