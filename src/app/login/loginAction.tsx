'use server'




export default async function loginAction (currentState:any,formdata:FormData):Promise<string | undefined>{
  
    // to extract data from form
    const email = formdata.get('email');
    const password = formdata.get('password');

    // to send api request
    const res = await fetch('http://http:localhost:3000/api/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'

        },
        body:JSON.stringify({email,password})

    })
    const json = await res.json();

    

    if(res.ok){
        
        console.error('Invalid Credential');
        
    }else {
        return json.error;
    }
    
     return;
}     
