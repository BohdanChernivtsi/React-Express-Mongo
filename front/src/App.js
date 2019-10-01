import React from 'react';
import QuestionList from './components/QuestionList';
import Login from './components/Login';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './routes/protected.route';

import axios from 'axios';




let isAuthenticated = false;


const setAuthorizationToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

const login = data => {
  axios.post('http://localhost:3001/login', data).then(res => {
    isAuthenticated = true;
    const token = res.data.token
    localStorage.setItem('jwtToken', token)
    setAuthorizationToken(token)
  })
}

const logout = () => {
  isAuthenticated = false;
}






function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <Switch>
        <ProtectedRoute exact path="/" component={QuestionList} />
        <Route path="/login" component={Login} /> />
      </Switch>
    </div>
  );
}

export { App, isAuthenticated, login, logout };
