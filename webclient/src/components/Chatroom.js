import React, { useEffect, useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
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
    ws.current.onopen = () => {};

    return () => {
      ws.current.close();
    };
  },[]);

  useEffect(()=>{
    ws.current.onmessage = async ({ data }) => {
      const { user, message } = JSON.parse(data);
      setChatList([...chatList, { user, message }]);
    };
  },[chatList])

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  
  const handleMessage = (e) => {
    e.preventDefault();
    if (message) {
      ws.current.send(JSON.stringify({ user: loggedIn, message }));
      setMessage("");
    }
  };

  return (
    <>
      <ul className="chat-list">
        {chatList.map((e, index) => (
          <li key={index}>
            <div>{e.user}</div>
            <div>{e.message}</div>
          </li>
        ))}
      </ul>
      <form className="chat-form">
        <input
          type="text"
          name="mssg"
          value={message}
          placeholder="Type message..."
          onChange={handleChange}
        />
        <button onClick={handleMessage}>Send</button>
      </form>
    </>
  );
};

export default Chatroom;
