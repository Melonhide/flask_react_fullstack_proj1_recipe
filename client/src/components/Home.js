import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../auth'
import Recipe from './Recipe'
import { Modal, Form, Button } from 'react-bootstrap'
import {useForm} from 'react-hook-form'

const LoggedInHome = () => {
    const [recipes, setRecipes] = useState([]);
    const [show, setShow] = useState(false);
    const {register, reset, handleSubmit, setValue, formState: {errors}} = useForm()
    const [recipeId, setRecipeId] = useState(0);

    useEffect(
        () => {
            getAllRecipes()
        }, []
    );

    const getAllRecipes=()=>{
        fetch('/recipe/recipes')
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setRecipes(data)
                })
                .catch(err => console.log(err))
    }
    

    const closeModal = () => {
        setShow(false)
    }

    const showModal = (id) => {
        console.log("Hello "+id);
        setShow(true)
        setRecipeId(id)
        recipes.map(
            (recipe) => {
                if(recipe.id===id){
                    console.log(recipe)
                    setValue('title', recipe.title)
                    setValue('description', recipe.description)
                }
            }
        )
    }

    let token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')

    const updateRecipe=(data)=>{
        console.log(data)

        const requestOptions={
            method:'PUT',
            headers:{
                'content-type':'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body:JSON.stringify(data)
        }

        fetch(`/recipe/recipe/${recipeId}`, requestOptions)
        .then(res=>res.json())
        .then(data=>{console.log(data)
            window.location.reload()
            
        })
        .catch(err=>console.log(err))

        console.log(token)
        console.log(recipeId)
    }


    const deleteRecipe=(id)=>{
        console.log(id)

        const requestOptions={
            method:'DELETE',
            headers:{
                'content-type':'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        }

        fetch(`/recipe/recipe/${id}`, requestOptions)
        .then(res=>res.json())
        .then(data=>{console.log(data)
            //window.location.reload()
            getAllRecipes()
        })
        .catch(err=>console.log(err))
    }


    return (
        <div className="recipes container">
            <Modal
                show={show}
                size='lg'
                onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Recipe
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

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
                            <Button as='sub' variant='primary' onClick={handleSubmit(updateRecipe)}>Save</Button>
                        </Form.Group>
                        <br />

                    </form>

                </Modal.Body>
            </Modal>
            <h1>List of Recipes</h1>
            {
                recipes.map(
                    (recipe, index) => (
                        <Recipe title={recipe.title}
                            key = {index}
                            description={recipe.description}
                            onClick={()=>{showModal(recipe.id)}}
                            onDelete={()=>{deleteRecipe(recipe.id)}}
                        />
                    )
                )
            }
        </div>
    )
}

const LoggedOutHome = () => {
    return (
        <div className="home container">
            <h1 className='heading'>Welcome to the Recipes</h1>
            <Link to='/signup' className='btn btn-primary btn-lg'>
                Get Started</Link>
        </div>

    )
}

const HomePage = () => {
    const [logged] = useAuth()

    return (
        <div>
            {logged ? <LoggedInHome /> : <LoggedOutHome />}
        </div>

    )
}

export default HomePage