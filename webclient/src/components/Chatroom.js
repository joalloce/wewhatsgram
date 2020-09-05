import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
const Chatroom = () => {
  const history = useHistory();
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
  useEffect(()=>{
    ws.onopen=()=>{
      console.log("open")
      //ws.send("hey")
    }
    ws.onmessage=({data})=>{
      console.log("message", data)
    }
    
  })
  const handleMessage = (e)=> {
    e.preventDefault();
    console.log("sending")
    ws.send("hey2")
  }
  const ws = new WebSocket("ws://localhost:8383")
  return (
    <>
      <ul className="chat-list"></ul>
      <form className="chat-form">
        <input type="text" name="mssg" placeholder="Type message..." />
        <button onClick={handleMessage}>Send</button>
      </form>
    </>
  );
};

export default Chatroom;
