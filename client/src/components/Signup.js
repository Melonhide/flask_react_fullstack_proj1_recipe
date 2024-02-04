import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'


const SignUpPage = () => {
    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm()

    const [show, setShow] = useState(false)

    const [serverResponse, setServerResponse]=useState('')

    const submitForm = (data) => {
        console.log(data)

        if (data.password === data.confirmPassword) {

            const body = {
                username: data.username,
                email: data.email,
                password: data.password
            }

            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }

            fetch('/auth/signup', requestOptions)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setServerResponse(data.message)
                    console.log(serverResponse)

                    setShow(true)
                })
                .catch(err => console.log(err))

            reset()


        } else {
            alert("Passwords do not match")
        }

    }

    console.log(watch("username"))
    console.log(watch("email"))
    console.log(watch("password"))
    console.log(watch("confirmPassword"))

    return (
        <div className="container">
            <div className='form'>
                {show?
                    <>  
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                            <p>
                                {serverResponse}
                            </p>
                        </Alert>
                        <h1>Sign Up Page</h1>
                    </>
                    :
                    <h1>Sign Up Page</h1>
                }
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
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            placeholder='Your email'
                            {...register('email', { required: true, maxLength: 80 })}
                        />

                        {errors.email?.type === "maxLength" &&
                            <p style={{ color: 'red' }}><small>Max Characters should be 80</small></p>}
                        {errors.email?.type === "required" && errors.email?.type !== "maxLength" &&
                            <p style={{ color: "red" }}><small>Email is required</small></p>}

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
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                            placeholder='Your username'
                            {...register('confirmPassword', { required: true, minLength: 8 })}
                        />

                        {errors.confirmPassword?.type === "minLength" &&
                            <p style={{ color: 'red' }}><small>Min Characters should be 8</small></p>}
                        {errors.confirmPassword?.type === "required" && errors.confirmPassword?.type !== "minLength" &&
                            <p style={{ color: "red" }}><small>Confirm Password is required</small></p>}
                    </Form.Group>

                    <br />
                    <Form.Group>
                        <Button as='sub' variant='primary' onClick={handleSubmit(submitForm)}>SignUp</Button>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <small>Already have an account?
                            <Link to="/login">Log In</Link>
                        </small>
                    </Form.Group>
                    <br />
                </form>
            </div>
        </div>
    )
}

export default SignUpPage