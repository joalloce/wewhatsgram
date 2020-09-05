import React, { useEffect, useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Chatroom = () => {
  const history = useHistory();
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState("");
  const { loggedIn } = useContext(AuthContext);
  const ws = useRef(null);

  useEffect(() => {
    async function requireAuth() {
      const res = await fetch("http://localhost:8383/auth/requireAuth", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.requireAuth) {
        history.push("/login");
      }
    }
    requireAuth();
  }, [history]);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8383");
    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    ws.current.onmessage = async ({ data }) => {
      const { user, message } = JSON.parse(data);
      setChatList([...chatList, { user, message }]);
    };
  }, [chatList]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessage = (e) => {
    e.preventDefault();
    if(  message) {
      ws.current.send(JSON.stringify({ user: loggedIn, message }));
      setMessage("");
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className="chatroom">
          <ul className="chat-list">
            {chatList.map((e, index) => (
              <li key={index}>
                <div className="user">{e.user}:</div>
                <div className="mssg">{e.message}</div>
              </li>
            ))}
          </ul>
          <form className="chat-form">
            <input
              class="message-input"
              type="text"
              name="mssg"
              value={message}
              placeholder="Type message..."
              onChange={handleChange}
            />
            <button class="send-button" onClick={handleMessage}>
              Send
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Chatroom;
