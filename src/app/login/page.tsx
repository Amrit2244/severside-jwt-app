'use client'
import { useFormState } from "react-dom";
import loginAction from "./loginAction";


export default function Login (){
  const [error , formAction] = useFormState(loginAction,undefined);

    
    return(
        <div>
            <h1>Login Page</h1>
            <form action={formAction}>
                <input type="email" name="email" id="email"placeholder="Enter Email ID Please"/>
                <input type="password" name="password" id="password" placeholder="Enter the Password Please"/>
                <button type="submit" >Login here</button>

            </form>
            {error && <p style={{color:'red'}}>{error}</p>}
        </div>

    )
}