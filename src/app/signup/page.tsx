


export default function SignUp (){


    return(
        <>
        <div>
          <h1>SignUp Page</h1>
            <form action="">
                <input type="emial"name="email" id="email" placeholder="Enter the Email Id Please" />
                <input type="password" name="password" id="password" placeholder="Enter The Password Please"/>
                <button type="submit">SignUP</button>
                </form>  
                {error && <p style={{color:'red'}}> {error} </p>}
        </div>
        </>

    )
}


