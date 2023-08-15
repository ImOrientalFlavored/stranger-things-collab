import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

/*Hex Codes: #f0f14e #6ded8a #1645f5 #ff5f85 #ed3833
 
white: {
    100: "#fcfcdc",
    200: "#f9f9b8",
    300: "#f6f795",
    400: "#f3f471",
    500: "#f0f14e",
    600: "#c0c13e",
    700: "#90912f",
    800: "#60601f",
    900: "#303010"
}, 
green: {
    100: "#e2fbe8",
    200: "#c5f8d0",
    300: "#a7f4b9",
    400: "#8af1a1",
    500: "#6ded8a",
    600: "#57be6e",
    700: "#418e53",
    800: "#2c5f37",
    900: "#162f1c"
}, 
indigo: {
    100: "#d0dafd",
    200: "#a2b5fb",
    300: "#738ff9",
    400: "#456af7",
    500: "#1645f5",
    600: "#1237c4",
    700: "#0d2993",
    800: "#091c62",
    900: "#040e31"
}, 
pink: {
    100: "#ffdfe7",
    200: "#ffbfce",
    300: "#ff9fb6",
    400: "#ff7f9d",
    500: "#ff5f85",
    600: "#cc4c6a",
    700: "#993950",
    800: "#662635",
    900: "#33131b"
}, 
red: {
    100: "#fbd7d6",
    200: "#f8afad",
    300: "#f48885",
    400: "#f1605c",
    500: "#ed3833",
    600: "#be2d29",
    700: "#8e221f",
    800: "#5f1614",
    900: "#2f0b0a"
},
*/
const palette = [
    {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#717681",
          400: "#424957",
          500: "#131b2d",
          600: "#0f1624",
          700: "#0b101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#d4ffef",
          200: "#aaffdf",
          300: "#7fffd0",
          400: "#55ffc0",
          500: "#2affb0",
          600: "#22cc8d",
          700: "#19996a",
          800: "#116646",
          900: "#083323",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
    },{ grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
      },
      primary: {
        100: "#040509",
        200: "#080b12",
        300: "#0b101b",
        400: "#0f1624",
        500: "#131b2d",
        600: "#424957",
        700: "#717681",
        800: "#a1a4ab",
        900: "#d0d1d5",
      },
      greenAccent: {
        100: "#083323",
        200: "#116646",
        300: "#19996a",
        400: "#22cc8d",
        500: "#2affb0",
        600: "#55ffc0",
        700: "#7fffd0",
        800: "#aaffdf",
        900: "#d4ffef",
      },
      redAccent: {
        100: "#2c100f",
        200: "#58201e",
        300: "#832f2c",
        400: "#af3f3b",
        500: "#db4f4a",
        600: "#e2726e",
        700: "#e99592",
        800: "#f1b9b7",
        900: "#f8dcdb",
      },
      blueAccent: {
        100: "#151632",
        200: "#2a2d64",
        300: "#3e4396",
        400: "#535ac8",
        500: "#6870fa",
        600: "#868dfb",
        700: "#a4a9fc",
        800: "#c3c6fd",
        900: "#e1e2fe",
      },
    }

]
export const tokens = (mode: string) => ({
  ...(mode === "dark" ? palette[0]:palette[1])}
  );

//mui theme setting
export const themeSettings = (mode: string) => {
    const colors = tokens(mode);
    return{
        palette:{
            mode: mode,
            ...(mode === 'dark'
            ?{
                primary:{
                    main: colors.primary[500],
                },
                secondary:{
                    main: colors.greenAccent[500],
                },
                neutral:{
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100],
                },
                background:{
                    default: colors.primary[500],
                }
            }
            :
            {
                primary:{
                    main: "#3e4396",
                },
                secondary:{
                    main: colors.greenAccent[500],
                },
                neutral:{
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100],
                },
                background:{
                    default: "#f0f0f0",
                }
            }),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1:{
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2:{
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3:{
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4:{
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5:{
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6:{
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        }
    }
};

// Context for color mode
export const ColorModeContext = createContext({
    toggleColorMode:() => {}
});

export const useMode = () => {
    const [mode, setMode] = useState<'light'|'dark'>('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];

}