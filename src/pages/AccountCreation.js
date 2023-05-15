
const CreateAccount = ({createAccount}) => {
    const addAccount = () => {
        const form = document.getElementById("createAccountForm");
        if(form.reportValidity()) {
            const username = document.getElementById("username").value;
            const pass = document.getElementById("pass").value;
            //TODO add account creation here

            console.log(username,pass);
            createAccount(false);
        }
        else {
            // TODO input validation error handling
        }
    };

    return (
        <form id="createAccountForm">
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" placeholder="username" pattern="\w{6,45}" required/>
            </div>
            <div>
                <label htmlFor="pass">Password</label>
                <input id="pass" type="password" placeholder="password" pattern="\w{6,45}" required/>
            </div>
            <input type="button" value="Create Account" onClick={addAccount}/>
            <input type="button" value="back" onClick={()=> (createAccount(false))} />
        </form>
    );
}




export default CreateAccount;