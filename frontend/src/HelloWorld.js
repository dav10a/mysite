import React, { useState, useEffect } from 'react';
import axios from 'axios';
function HelloWorld() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://192.168.0.19:8000/getuser')
      .then(response => {
        setMessage(response.data.username);
      })
      .catch(error => {

         setMessage(error.message);
      });
  }, []);
//show react loading screen until message is set but at least 1 second with settiemout
  


  return (
    <div>
      <h1>Hello, World!</h1>
      <p>{message}</p>
    </div>
  );
}

export default HelloWorld;