import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import NoMatch from './pages/NoMatch';
// import TopRated from './components/TopRated';
import SearchMovies from './pages/SearchMovies';
require ('dotenv').config();

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div className="flex-column justify-flex-start min-100-vh">
        
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchMovies} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignupForm} />

            <Route component={NoMatch} />
          </Switch>
        </div>
        
        <div>
          {/* <SearchMovies /> */}
          {/* <TopRated /> */}
        </div>
      </div>
    </Router>
  </ApolloProvider>
  );
}

export default App;
