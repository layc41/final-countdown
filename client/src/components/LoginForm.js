import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
// import { Link } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations"
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="container my-1 forms">
      {/* <Link to="/signup">
        ← Go to Signup
      </Link> */}

      <h2 className='heading'>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email" className='heading'>Email address:</label>
          <input
            placeholder="Enter email"
            className="form-control"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd" className='heading'>Password:</label>
          <input
            placeholder="Enter password"
            className="form-control"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {
          error ? <div>
            <p className="error-text" >The provided credentials are incorrect</p>
          </div> : null
        }
        <div className="flex-row flex-end">
        <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
        </div>
      </form>
    </div>
  );
}


export default Login;