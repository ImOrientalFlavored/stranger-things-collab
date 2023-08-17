import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

interface HeaderProps{
    title:string,
    subtitle:string
}

export default function Header({title, subtitle}:HeaderProps){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <Box mb="30px">
            <Typography
                variant="h2"
                color={colors.greenAccent[500]}
                fontWeight={"bold"}
                sx={{
                    mb:"5px",
                    fontSize:"72px"
                }}
            >{title}</Typography>
            <Typography
                variant="h6"
                color={colors.greenAccent[700]}

            >{subtitle}</Typography>
        </Box>
    )
}