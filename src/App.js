import Login from "./pages/Login.js";
import Sudoku from "./pages/Sudoku.js";
import {useState} from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("loggedIn") ? 
                                      sessionStorage.getItem("loggedIn") == "true" : false);

  const [username, setUsername] = useState( sessionStorage.getItem("username") && isLoggedIn ? sessionStorage.getItem("username") : "");

  const [password, setPassword] = useState( sessionStorage.getItem("pass") && isLoggedIn ? sessionStorage.getItem("pass") : "");
  
  const setIsLoggedInWithSession = (value) => {
    sessionStorage.setItem("loggedIn", value);
    setIsLoggedIn(value);
  }

  const setUsernameWithSession = (value) => {
    sessionStorage.setItem("username",value);
    setUsername(value);
  }
  const setPassWithSession = (value) => {
    sessionStorage.setItem("pass",value);
    setPassword(value);
  }


  if(isLoggedIn) return (<Sudoku setLogin={setIsLoggedInWithSession} username={username} password={password}/>)
  else return (<Login setLogin={setIsLoggedInWithSession} setUser={setUsernameWithSession} setPass={setPassWithSession}/>)

}

export default App;

