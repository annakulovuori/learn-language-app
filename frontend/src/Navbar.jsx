import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#EAEAEA",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between", // Hajauttaa napit tasaisesti
              flexGrow: 1, // Hyväksyy että napit voi täyttää jäljelle jääneen tilan
            }}
          >
            {["/HOME", "/PLAYER", "/ADMIN", "/INFO"].map((path, index) => (
              <Button
                key={index}
                component={Link}
                to={path}
                variant="text"
                sx={{
                  flex: 1, // Jokainen nappi vie saman verran tilaa
                  textTransform: "none",
                  fontSize: "1.2rem",
                  color: "#333333",
                  "&:hover": { backgroundColor: "#EFB4FA" },
                  ...(isActive(path) && { borderBottom: "3px solid #EFB4FA" }),
                }}
              >
                {path.substring(1)}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
