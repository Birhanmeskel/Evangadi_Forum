import { useRef } from "react";
import axios from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import classes from "./Register.module.css";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Register() {
    const navigate = useNavigate ();
    const userNameDom = useRef();
    const firstNameDom = useRef();
    const lastNameDom = useRef();
    const emailDom = useRef();
    const passwordDom = useRef();

    async function handleSubmit (e) {
        e.preventDefault();
        const usernameValue = userNameDom.current.value;
        const firstnameValue = firstNameDom.current.value;
        const lastnameValue = lastNameDom.current.value;
        const emailValue = emailDom.current.value;
        const passwordValue = passwordDom.current.value;
        if (
            !usernameValue ||
            !firstnameValue ||
            !lastnameValue ||
            !emailValue ||
            !passwordValue
        ) {
            alert('Please provide all required information');
            return;
        }

     try {
        await axios.post('/users/register', {
            username: usernameValue,
            firstname: firstnameValue,
            lastname: lastnameValue,
            email: emailValue,
            password: passwordValue,
        });
        // alert("register successful. Please login");
        navigate('/login');
     } catch (error) {
        // alert('something went wrong!')
        console.log(error.response);
     }
    }
  return (
    <section className={classes.container}>
         <h2 className={classes.title}>Join the network</h2>
              <p className={classes.text}>
                Already have an account?{" "}
                <a href="#" className={classes.link}>
                  Sign in
                </a>
              </p>
        <form onSubmit={handleSubmit}>
        <div className={classes.input_group}>
                <input 
                ref={emailDom}
                type="text" 
                placeholder="Email" />
            </div>
        
            <div className={classes.input_name_container}>
            <div className={classes.input_group}>
                <input 
                ref={firstNameDom}
                type="text" 
                placeholder="First Name" />
            </div>
           
            <div className={classes.input_group}>
                 <input 
                 ref={lastNameDom}
                 type="text" 
                 placeholder="Last Name"/>
            </div>
            </div>
        
            <div className={classes.input_group}>
                <input 
                ref={userNameDom}
                type="text" 
                placeholder="User Name" 
                />
                </div>

            
            <div className={classes.input_group}>
               
                <input 
                    ref={passwordDom}
                    type="text" 
                    placeholder="Password" />
                     <span> <VisibilityOffIcon /></span>
            </div>
            <button type="submit" className={classes.btn}>Agree and Join</button>
            <br />
            <br />

              <p className={classes.form_footer}>
                <p>I agree to the <a href="#" className={classes.link}>
                        privacy policy
                        </a> and <a href="#" className={classes.link}>
                        terms of service
                        </a>.</p>
                        <br />

                <p>
                        <a href="#" className={classes.link}>
                                Already have an account?
                                    </a>
                                </p>
                    </p>
        </form>
    
    </section>
  )
}

export default Register
