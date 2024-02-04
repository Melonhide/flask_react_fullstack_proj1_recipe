import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { login } from '../auth'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()

    const navigate=useNavigate()

    console.log(watch('username'))
    console.log(watch('password'))


    const loginUser = (data) => {
        console.log(data)

        const body = {
            username: data.username,
            password: data.password
        }

        const requestOptions={
            method:"POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch('/auth/login', requestOptions)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    login(data.access_token)
                    
                    navigate('/')
                })
                .catch(err => console.log(err))

        reset()
    }


    return (
        <div className="container">
            <div className='form'>
                <h1>Login Page</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder='Your username'
                            {...register('username', { required: true, maxLength: 25 })}
                        />
                        {errors.username?.type === "maxLength" &&
                            <p style={{ color: 'red' }}><small>Max Characters should be 25</small></p>}
                        {errors.username?.type === "required" && errors.username?.type !== "maxLength" &&
                            <p style={{ color: "red" }}><small>Username is required</small></p>}
                    </Form.Group>

                    <br />
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder='Your password'
                            {...register('password', { required: true, minLength: 8 })}
                        />
                        {errors.password?.type === "minLength" &&
                            <p style={{ color: 'red' }}><small>Min Characters should be 8</small></p>}
                        {errors.password?.type === "required" && errors.password?.type !== "minLength" &&
                            <p style={{ color: "red" }}><small>Password is required</small></p>}
                    </Form.Group>

                    <br />
                    <Form.Group>
                        <Button as='sub' variant='primary' onClick={handleSubmit(loginUser)}>Login</Button>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <small>Do not have an account?
                            <Link to="/signup">Create One</Link>
                        </small>
                    </Form.Group>
                    <br />
                </form>
            </div>
        </div>
    )
}

export default LoginPage