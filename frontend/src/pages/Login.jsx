import React, {useRef} from 'react';
import axios from '../axiosconfig'
import {useNavigate, Link} from 'react-router'


const Login = () => {
       const navigate = useNavigate()
        const emailDom = useRef(null);
        const passwordDom = useRef(null);
        async function handleSubmit (e){
            e.preventDefault()
            const emailvalue = emailDom.current.value;
            const passvalue = passwordDom.current.value;
            
            if (

                !emailvalue ||
                !passvalue 
            ) {
                alert ('please provide all required information ');
                return;
            }
                try {
                  const {data} = await axios.post('/users/login', {

                    email: "",
                    password:"",
                  });
                  alert('login successful. ')
                  localStorage.setItem('token', data?.token)
                //   navigate('/');

                console.log(data);
                    
                } catch (error) {
                    alert(error?.response?.data?.msg);
                    console.log(error.response.data);
                }
            
        }
    return (
        <section>
            <form onClick={handleSubmit}>
                 <div>
                    <span> email :--- </span>
                    <input 
                    ref={emailDom}
                    type="email"
                     placeholder='email'/>
                </div>
                <br />

                <div>
                    <span> password :--- </span>
                    <input
                    ref={passwordDom}
                     type="password" 
                     placeholder='password'/>
                </div>
                <br />

                <button type='submit'>Login</button>
            </form>
            <Link to={'/register'}>Register</Link>
            
        </section>
    );
}

export default Login;
