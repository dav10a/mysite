//react login bootstrap form
import React, { useState,useEffect } from 'react';
import { Form, Button,Image } from 'react-bootstrap';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
//include bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
//import formprovider
import { FormProvider } from 'react-hook-form';
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');


function Login() {
  const [username, setUsername] = useState('');
  const [formclass, setFormclass] = useState('needs-validation');
  const handleSubmit = (event) => {
    event.preventDefault();
    //check validity of form 
    const form = event.currentTarget;
    setFormclass('was-validated');
    if (form.checkValidity() === false) {
        event.stopPropagation();
        return;
        }
    alert('form is valid');
   
    axios.post('http://192.168.0.19:8000/login', {
        username: event.target.elements.username.value},
        {headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': csrftoken
    },
    withCredentials: true},
        )
        .then(response => {
            localStorage.setItem('token', response.data.token);
            alert(response.data.message);
        })
        .catch(error => {
            console.log(error);
            alert(error);
        });
    }

    return (
        <Form onSubmit={handleSubmit} class={formclass} noValidate>
      <Image class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></Image>
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <Form.Control type="text" id="inputEmail" name="username" class="form-control" placeholder="Email address" required/>
      
      <Button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</Button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </Form>
    );
}
export default Login;
