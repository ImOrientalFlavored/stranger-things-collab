import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
        position={"relative"}
     
        sx={{
            backgroundColor: (theme) =>
            theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[900],
            p: 4,
            width: "100vw",
            height: "5vh", 
        }}
      component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          <img src="/ori-logo.png" alt="logo" width={'35px'} />
          {" © "}
          <Link color="inherit" href="/">
            ImOrientalFlavored
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}