'use client';

import { useFormState } from "react-dom";
import signupAction from "@/app/signup/signupAction";

export default function Signup (){
    const [error,formAction]= useFormState(signupAction,undefined);
    return(
        <>
        <div>
          <h1>SignUp Page</h1>
            <form action={formAction}>
                <input type="emial"name="email" id="email" placeholder="Enter the Email Id Please" />
                <input type="password" name="password" id="password" placeholder="Enter The Password Please"/>
                <button type="submit">SignUP</button>
                </form>  
                {error && <p style={{color:'red'}}>{error}</p>}                        
        </div>
        </>              

    )
}


 