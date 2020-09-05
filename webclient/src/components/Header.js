import React, { useContext,useState,useEffect } from "react";
import { AppBar, Button, Typography, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Header = () => {
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [username,setUsername] = useState("")
  useEffect(() => {
    async function checkUser() {
      const res = await fetch("http://localhost:8383/auth/checkUser", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.user) {
        setUsername(data.user.username);
      }else {
        setUsername("")
      }
    }
    checkUser();
  }, [loggedIn]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8383/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    setLoggedIn("")
    history.push("/login");
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">WeWhatsgram {username}</Typography>
          {username ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : null}
          {!username ? (
            <Button color="inherit" onClick={() => history.push("/login")}>
              Login
            </Button>
          ) : null}
          {!username ? (
            <Button color="inherit" onClick={() => history.push("/signup")}>
              Signup
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
