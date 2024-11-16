"use server"

import {useRouter} from 'next/navigation';


export default async function signupAction (currentState:any,formdata:FormData):Promise<string |undefined > {
        const router = useRouter();
        // get data from the form
        const email = formdata.get('email') as string
        const password = formdata.get('password') as string 
        // send data to api route
        const res = await fetch('http://localhost:3000/api/signup',{
            method:'POST',
            headers:{
                'Content:Types':'application/json'
            },
            body :JSON.stringify({email,password})
        })
        const json = await res.json();

        //redirect to login page
        if(res.ok){
            router.push('/login')
        }else{
            return json.error
            
        }
        return;
    }