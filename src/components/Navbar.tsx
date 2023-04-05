import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import RegisterDialog from "../feature/user/RegisterDialog";
import LoginDialog from "../feature/user/LoginDialog";
import { useAppSelector } from "../app/hooks"
import Menu from "./Menu"
function Navbar() {
  const [loginOpen, setloginOpen] = React.useState(false);
  const [registerOpen, setregisterOpen] = React.useState(false);

  const handleLoginOpen = () => setloginOpen(true);
  const handleLoginClose = () => setloginOpen(false);
  const handleLRegisterOpen = () => setregisterOpen(true);
  const handleRegisterClose = () => setregisterOpen(false);
  const handleLogout =()=>{}
  const userStatus = useAppSelector((state) => state.user.user)
  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            // component="a"
            // href="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow:1
            }}
          >
            Todo List
          </Typography>
          {userStatus==="guest"?
          <>
          <Button color="inherit" onClick={handleLoginOpen}>Login</Button>
          <Button color="inherit" onClick={handleLRegisterOpen}>Register</Button>
          </>:<Menu name={userStatus}/>
          }
        </Toolbar>
      </Container>
    </AppBar>
    <LoginDialog open={loginOpen} close={handleLoginClose}/>
    <RegisterDialog open={registerOpen} close={handleRegisterClose}/>
    </>
  );
}

export { Navbar };