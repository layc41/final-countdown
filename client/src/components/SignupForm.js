import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };
 

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState }
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div className="container my-1 forms">
        <h2 className='heading'>Sign Up</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Enter username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Enter email"
                name="email"
                type="email"
                id="email" 
                value={formState.email}
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Enter Password"
                name="password"
                type="password"
                id="password" 
                value={formState.password}
                onChange={handleChange} 
              />
            </div>
            <button type="submit" className="btn btn-dark btn-lg btn-block">Sign Up</button>
          </form> 
            {error && <div> Sign Up Failed! </div>}
    </div>
  );
};

export default Signup;
