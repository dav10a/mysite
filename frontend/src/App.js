import React, { useEffect, useState } from 'react';
import HelloWorld from './HelloWorld';
import Login from './Login';
import axios from 'axios';
//get user from http://192.168.0.19:8000/getuser, if not logged in, redirect to login page
function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    axios.get('http://192.168.0.19:8000/getuser', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setUser(response.data.username);
      })
      .catch(error => {
        
      });
  }, []);
  //if user is not logged in, redirect to login page
  if (!user) {
    return (
      <Login />
    );
  }
  return (
    <HelloWorld />
  );


}
export default App;
