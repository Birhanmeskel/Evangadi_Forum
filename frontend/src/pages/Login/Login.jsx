import React, { useRef } from "react";
import axios from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
function Login() {
  const navigate = useNavigate();

  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (!emailValue || !passValue) {
      alert("Please fill all fields!");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("login successful!");
      console.log(data);

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }
  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Login to your account</h2>
      <p className={classes.text}>
        Don't have an account?{" "}
        <a href="#" className={classes.link}>
          Create a new account
        </a>
      </p>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={classes.input_group}>
            <input ref={emailDom} type="email" placeholder="Email adress" />
          </div>
          <br />
          <div className={classes.input_group}>
            <input
              ref={passwordDom}
             type="password"
              placeholder="Password"
            />
          </div>
          <p className={classes.form_footer}>
            <a href="/" className={classes.link}>
              Forgot password?
            </a>
          </p>
          <button type="submit" className={classes.btn}>
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
