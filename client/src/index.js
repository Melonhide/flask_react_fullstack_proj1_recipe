import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css'
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/Navbar';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"
import HomePage from './components/Home';
import LoginPage from './components/Login';
import CreateRecipePage from './components/CreateRecipe';
import SignUpPage from './components/Signup';

const App = () => {
    return (
        <Router>
            <div className="">
                <NavBar />
                <Routes>
                    <Route path="/create_recipe" element={<CreateRecipePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

