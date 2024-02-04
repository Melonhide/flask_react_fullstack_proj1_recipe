import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useAuth } from '../auth'


const CreateRecipePage = () => {
    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm()
    const [logged] = useAuth();

    const [show, setShow] = useState(false)

    const [serverResponse, setServerResponse] = useState('')

    const createRecipe = (data) => {
        console.log(data)

        const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
        console.log(token)
        
        
        if (logged) {
            const body = {
                title: data.title,
                description: data.description
            }
            
            console.log(body)
            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'Authorization':`Bearer ${JSON.parse(token)}`
                },
                body: JSON.stringify(body)
            }

            fetch('/recipe/recipes', requestOptions)
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
            alert("Please log in first")
        }
    }

    console.log(watch("title"))
    console.log(watch("description"))
    //console.log(watch("password"))
    //console.log(watch("confirmPassword"))


    return (
        <div className="container">
            <div className='form'>
                {show ?
                    <>
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                            <p>
                                {serverResponse}
                            </p>
                        </Alert>
                        <h1>Create Recipe</h1>
                    </>
                    :
                    <h1>Create Recipe</h1>
                }
                <form>
                    <Form.Group>
                        <Form.Label>Recipe</Form.Label>
                        <Form.Control type="text"
                            placeholder='Recipe Name'
                            {...register('title', { required: true, maxLength: 25 })}
                        />

                        {errors.title?.type === "maxLength" &&
                            <p style={{ color: 'red' }}><small>Title should be less than 25 characters</small></p>}
                        {errors.title?.type === "required" && errors.username?.type !== "maxLength" &&
                            <p style={{ color: "red" }}><small>Recipe Title is required</small></p>}
                    </Form.Group>

                    <br />
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea"
                            className='description-input'
                            placeholder='Recipe Description'
                            {...register('description', { required: true, maxLength: 80 })}
                        />

                        {errors.description?.type === "maxLength" &&
                            <p style={{ color: 'red' }}><small>Max Characters should be 80</small></p>}
                        {errors.description?.type === "required" && errors.email?.type !== "maxLength" &&
                            <p style={{ color: "red" }}><small>Recipe Description is required</small></p>}

                    </Form.Group>


                    <br />
                    <Form.Group>
                        <Button as='sub' variant='primary' onClick={handleSubmit(createRecipe)}>Save</Button>
                    </Form.Group>
                    <br />

                </form>
            </div>
        </div>
    )
}

export default CreateRecipePage