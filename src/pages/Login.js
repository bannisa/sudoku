import { useState } from 'react';
import CreateAccount from "./AccountCreation.js";


const Login = ({setLogin,setUser,setPass}) => {
    const OK_STATUS_CODE = 200;
    const [createAccount, setCreateAccount] = useState(sessionStorage.getItem("createAccount") ? 
                                                sessionStorage.getItem("createAccount") === "true" : false );

    const setCreateAccountWithSession = (value) => {
        sessionStorage.setItem("createAccount",value);
        setCreateAccount(value);
    };

    const login = async () => {
        const form = document.getElementById("loginForm");
        if(form.reportValidity()) {
            const username = document.getElementById("username").value;
            const password = document.getElementById("pass").value;
            setUser(username);
            setPass(password);
            setLogin(true)
            //TODO add login functionally
        }
        else {

        }
    };

    if(createAccount) return <CreateAccount createAccount={setCreateAccountWithSession}/>;

    else
        return (
            <div>
                <div id="header">
                    
                </div>
                <form id="loginForm" onSubmit={login}>
                    <div>
                        <label htmlFor="username">Username </label>
                        <input id="username" type="text" pattern="\w{6,45}" placeholder="username" required/>
                    </div>

                    <div>
                        <label htmlFor="pass">Password </label>
                        <input id="pass" type="password" pattern="\w{6,45}" placeholder="password" required/>
                    </div>
    
                    <input type="button" id="submit" value="Login" onClick={login}/>
                </form>
                <input type="button" value="Create Account" onClick={() => {setCreateAccountWithSession(true)}}/>
            </div>
        );
}

export default Login;