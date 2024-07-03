import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [cred, setCred] = useState({email:"", password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();  // This will prevent reloading of the page
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:cred.email,password: cred.password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            let value = localStorage.getItem('token'); // Retrieve the item
            console.log(value);
            props.showAlert("Logged in successfully", "success" )
            navigate('/') // redirect to home
            
          
        }
        else{
            props.showAlert("Invalid credentials", "danger" )
        }



    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={cred.email} onChange={onChange} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={cred.password} onChange={onChange} name="password" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Login
