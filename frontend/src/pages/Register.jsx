import React, { use } from 'react';
import { useRef } from 'react';
import {useNavigate} from 'react-router'
import axios from '../axiosconfig'

const Register = () => {
    const navigate = useNavigate()
    const usernameDom = useRef(null);
    const firstnameDom = useRef(null);
    const lastnameDom = useRef(null);
    const emailDom = useRef(null);
    const passwordDom = useRef(null);

    async function handleSubmit (e){
        e.preventDefault()
        const usernamevalue = usernameDom.current.value;
        const firstvalue = firstnameDom.current.value;
        const lastvalue = lastnameDom.current.value;
        const emailvalue = emailDom.current.value;
        const passvalue = passwordDom.current.value;
        
        if (
            !usernamevalue ||
            !firstvalue ||
            !lastvalue ||
            !emailvalue ||
            !passvalue 
        ) {
            alert ('please provide all required information ');
            return;
        }
            try {
              await  axios.post('/users/register', {
                username: "",
                firstnam: "",
                lastname:"",
                email: "",
                password:"",
              });
              alert('register successful. please login')
              navigate('/login');
            
                
            } catch (error) {
                alert('somthing went wrong');
                console.log(error.response);
            }
        
    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    <span> username :--- </span>
                    <input
                    ref={usernameDom}
                    type="text" 
                    placeholder='username' />
                </div>
                <br />

                <div>
                    <span> Firstname :--- </span>
                    <input 
                    ref={firstnameDom}
                    type="text"
                     placeholder='firstname' />
                </div>
                <br />

                <div>
                    <span> Lastname :--- </span>
                    <input 
                    ref={lastnameDom}
                    type="text"
                     placeholder='lastname' />
                </div>
                <br />

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

                <button type='submit'>Register</button>
            </form>
            <Link to={'/login'}>Login</Link>

        </section>
    );
}

export default Register;
