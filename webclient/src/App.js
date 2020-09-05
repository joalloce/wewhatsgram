import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Chatroom from "./components/Chatroom";
import AuthContextProvider from "./context/AuthContext";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthContextProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route path="/signup" component={Signup}  />
            <Route path="/chatroom" component={Chatroom} />
          </Switch>
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
