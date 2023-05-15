import Login from "./pages/Login.js";
import Sudoku from "./pages/Sudoku.js";
import {useState} from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  

  if(isLoggedIn) return (<Sudoku setLogin={setIsLoggedIn} username={username} password={password}/>)
  else return (<Login setLogin={setIsLoggedIn} setUser={setUsername} setPass={setPassword}/>)

}

export default App;

