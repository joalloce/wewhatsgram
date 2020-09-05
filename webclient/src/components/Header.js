import React, { useContext } from "react";
import { AppBar, Button, Typography, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Header = () => {
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8383/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    setLoggedIn("");
    history.push("/login");
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" onClick={() =>history.push("/")}>WeWhatsgram {loggedIn}</Typography>
          {loggedIn ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <Button color="inherit" onClick={() => history.push("/chatroom")}>
                Chatroom
              </Button>
            </>
          ) : null}
          {!loggedIn ? (
            <>
              <Button color="inherit" onClick={() => history.push("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => history.push("/signup")}>
                Signup
              </Button>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
